import Head from "next/head";
import { Anta, Inter, Trispace } from "next/font/google";
import styles from "./terminal.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/navbar";
import { FiMic } from "react-icons/fi";
import { useAccount } from "wagmi";
import { isTerminalAvailable } from "../utils/db";

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

const Terminal = () => {
  const { address, isConnected } = useAccount();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const [chatArray, setChatArray] = useState<
    { input: string; response: string }[]
  >([]);

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
    if (!isConnected) {
      setErrorMessage("Please sign in, so I know who I'm speaking with.");
      return;
    }

    // Check if user has enough tokens when connected
    if (address && !isTerminalAvailable(address, "")) {
      // Empty signature for now
      setErrorMessage("You do not hold enough tokens.");
      return;
    }

    setErrorMessage("");
  }, [address, isConnected]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddToChat = () => {
    if (inputValue.trim() === "") return;

    const newEntry = {
      input: inputValue,
      response: `Bot response for "${inputValue}"`, // Customize your bot response logic here
    };

    setChatArray((prevArray) => [...prevArray, newEntry]); // Add to the array
    setInputValue(""); // Clear input box
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddToChat();
    }
  };

  return (
    <>
      <Head>
        <title>AIGG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${antaFont.variable} ${trispaceFont.variable} ${interFont.variable} ${styles.main}`}
      >
        <Navbar />
        <div className={styles.contentContainer}>
          <div className={styles.currPath}>{currentPath}</div>
          <div className={styles.terminalHeader}>
            {errorMessage
              ? errorMessage
              : `Now you've got my attention. Just you, me, and whatever's on
                your mind—drop a tweet my way, and I'll make it our next move.
                Let's chat, interact, and shake things up together.`}
          </div>
          {/* <div className={styles.terminalCont}>
            <div
              className={styles.terminalDetails}
              style={{
                opacity: inputValue === "" && chatArray.length == 0 ? 1 : 0, // Opacity logic
                transition: "opacity 2s ease",
              }}
            >
              <div className={styles.terminalHeader}>
                Now you've got my attention. Just you, me, and whatever's on
                your mind—drop a tweet my way, and I'll make it our next move.
                Let's chat, interact, and shake things up together.
              </div>
              <div className={styles.terminalLogo}>
                <img src="/images/terminalLogo.png" alt="" />
              </div>
            </div>
            <div className={styles.terminal}>
              <div className={styles.micIcon}>
                <FiMic />
              </div>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="write"
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                  onChange={handleInputChange} // Add the onChange event here
                />
              </div>
              <div className={styles.sendButton} onClick={handleAddToChat}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.91337 12.0848C9.72226 11.894 9.49449 11.7439 9.24381 11.6436L1.31381 8.46357C1.21912 8.42558 1.13833 8.35953 1.08226 8.27429C1.0262 8.18906 0.997552 8.08871 1.00016 7.98673C1.00278 7.88474 1.03652 7.78599 1.09688 7.70374C1.15723 7.62149 1.2413 7.55966 1.33781 7.52657L20.3378 1.02657C20.4264 0.994564 20.5223 0.988456 20.6143 1.00896C20.7062 1.02946 20.7904 1.07573 20.857 1.14235C20.9236 1.20896 20.9699 1.29317 20.9904 1.38512C21.0109 1.47707 21.0048 1.57296 20.9728 1.66157L14.4728 20.6616C14.4397 20.7581 14.3779 20.8421 14.2956 20.9025C14.2134 20.9628 14.1146 20.9966 14.0126 20.9992C13.9107 21.0018 13.8103 20.9732 13.7251 20.9171C13.6398 20.861 13.5738 20.7803 13.5358 20.6856L10.3558 12.7536C10.255 12.5031 10.1045 12.2756 9.91337 12.0848ZM9.91337 12.0848L20.8538 1.14657"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div> */}
          <div className={styles.terminalLogo}>
            <img src="/images/terminalLogo.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Terminal;
