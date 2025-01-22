import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import WalletButton from "./WalletButton";
let tabs = [
  {
    name: "about",
    href: "/",
    title: "Home",
  },
  {
    name: "agent",
    href: "/agent",
    title: "Agent",
  },
  {
    name: "terminal",
    href: "/terminal",
    title: "Terminal",
  },
];

const Navbar = () => {
  const [isHamburger, setIsHamburger] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    const current = router.asPath.replace("/", "").toLowerCase();
    setCurrentPath(current || "about");
  }, [router.asPath]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target) &&
        closeIconRef.current &&
        !closeIconRef.current.contains(event.target)
      ) {
        setIsHamburger(false);
      }
    };

    if (isHamburger) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Optional: prevent background scroll
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isHamburger]);

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Link href="/">Aigg</Link>
      </div>
      <div className={styles.tabCont}>
        {tabs.map((tab) => (
          <div
            key={uuid()}
            className={`${styles.tab} ${
              currentPath === tab.name ? styles.active : ""
            }`}
          >
            <Link href={tab.href}>{tab.title}</Link>
          </div>
        ))}
      </div>
      <div className={styles.walletConnect}>
        <WalletButton />
      </div>

      <div className={styles.activeTab}>{currentPath}</div>
      <div className={styles.hamburgerOuter}>
        <div
          className={`${styles.hamburger} ${isHamburger ? styles.open : ""}`}
          onClick={() => setIsHamburger(!isHamburger)}
          ref={isHamburger ? closeIconRef : undefined}
        >
          <div className={`${styles.line} ${styles.line1}`}></div>
          <div className={`${styles.line} ${styles.line2}`}></div>
          <div className={`${styles.line} ${styles.line3}`}></div>
        </div>
      </div>

      <div
        className={`${isHamburger ? styles.hamburgerCont : ""}`}
        style={{ display: isHamburger ? "" : "none" }}
      >
        <div className={styles.sideNavCont} ref={sideNavRef}>
          {tabs.map((tab) => (
            <div
              key={uuid()}
              className={`${styles.sideTab} ${
                currentPath === tab.name ? styles.active : ""
              }`}
            >
              <Link href={tab.href}>{tab.title}</Link>
            </div>
          ))}
          <div className={styles.sideWalletConnect}>
            <WalletButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
