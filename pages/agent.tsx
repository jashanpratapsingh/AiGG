import Head from "next/head";
import { Anta, Inter, Trispace } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/navbar";
import styles from "./agent.module.css";
import { v4 as uuid } from "uuid";
import { getLogs, LogsSchemaType } from "../utils/db";
import {
  createTokenBody,
  serializeToken,
  serializeTokenBody,
} from "@/utils/auth";
import { useToken } from "@/hooks/useToken";
import { useAccount, useConfig } from "wagmi";
import WalletButton from "./components/WalletButton";
import { signMessage } from "@wagmi/core";
import { TwitterTweetEmbed } from "react-twitter-embed";

const antaFont = Anta({
  variable: "--font-anta",
  weight: ["400"],
  subsets: ["latin"],
});

const trispaceFont = Trispace({
  variable: "--font-trispace",
  weight: ["400"],
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const Agent = () => {
  const router = useRouter();
  const { token, signToken } = useToken(true);
  const { address, isConnected } = useAccount();

  const [currentPath, setCurrentPath] = useState<string>("");
  const [logs, setLogs] = useState<LogsSchemaType>([]);

  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const walletAddress = "0x1234567890";
  const signature = "0x1234567890";

  // /signmessage
  const config = useConfig();

  useEffect(() => {
    const current = router.asPath.replace("/", "").toLocaleLowerCase();

    console.log(current);
    if (current === "") {
      setCurrentPath("about");
      return;
    }
    if (current === "agent") {
      setCurrentPath("agent");
      return;
    }
    if (current === "terminal") {
      setCurrentPath("terminal");
      return;
    }
  }, [router.pathname]);

  useEffect(() => {
    getLogs(walletAddress, signature).then((logs) => {
      setLogs(logs);
      console.log(logs);
    });
  }, [walletAddress, signature]);

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    // Extract components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format and return
    return {
      date: `${day}-${month}-${year}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  }

  async function getResponse(message: string) {
    if (!token) return; // TODO: throw error

    const { messages, error } = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authentication: "Bearer " + serializeToken(token),
      },
      body: JSON.stringify({ message }),
    }).then((r) => r.json());

    const newLogs = (messages ?? [error]).map((text: string) => ({
      timestamp: new Date().toISOString(),
      text,
    }));

    setLogs([...logs, ...newLogs]);
  }

  useMemo(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  async function signUser() {
    if (!address || !isConnected) {
      return;
    }

    try {
      const message = await signMessage(config, {
        message: serializeTokenBody(createTokenBody(address)),
      });

      console.log(message);

      if (message) {
        setIsSignedIn(true);
      }
    } catch (error) {
      setIsSignedIn(false);
      return;
    }
  }

  return (
    <>
      <Head>
        <title>AIGG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div
        className={`${antaFont.variable} ${trispaceFont.variable} ${interFont.variable} ${styles.main}`}
      >
        <div className={styles.contentContainer}>
          <div className={styles.currPath}>{currentPath}</div>
          {isConnected && isSignedIn ? (
            <div className={styles.agents} ref={scrollRef}>
              {logs.map((eachLog) => {
                const { date, time } = formatTimestamp(eachLog.timestamp);

                return (
                  <div key={uuid()} className={styles.agent}>
                    <div className={styles.agentTime}>
                      {date}
                      <br></br>
                      {time}
                    </div>
                    <div className={styles.agentText}>
                      {eachLog.text}
                      {eachLog.tweetId && (
                        <TwitterTweetEmbed
                          options={{
                            cards: "hidden",
                            hideCard: true,
                            hideThread: true,
                            theme: "dark",
                          }}
                          tweetId="1083592734038929408"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <button
                style={{
                  width: "fit-content",
                  margin: "auto",
                  padding: "1em 0.5em",
                  background: "blue",
                  color: "white",
                }}
                onClick={() => getResponse("hello")}
              >
                Send test message
              </button>
            </div>
          ) : (
            <div className={styles.notSignedIn}>
              {!isConnected && (
                <div className={styles.notSignedInContent}>
                  <h1>Not signed in</h1>
                  <p>Connect your wallet to view messages</p>
                  <div className={styles.sideWalletConnect}>
                    <WalletButton />
                  </div>
                </div>
              )}
              {isConnected && token && address && (
                <div className={styles.notSignedInContent}>
                  <h1>Not signed in</h1>
                  <p>Sign in to view messages</p>
                  <div className={styles.sideWalletConnect} onClick={signUser}>
                    Sign in
                  </div>
                </div>
              )}
            </div>
          )}
          <img src="/images/castle.png" alt="" className={styles.castle} />
        </div>
      </div>
    </>
  );
};

export default Agent;
