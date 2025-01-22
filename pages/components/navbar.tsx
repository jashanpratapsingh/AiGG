import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
const Navbar = () => {
  const [isHamburger, setIsHamburger] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>("");

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
        <div
          className={`${styles.tab} ${
            currentPath === "about" ? styles.active : ""
          }`}
        >
          <Link href="/">Home</Link>
        </div>
        <div
          className={`${styles.tab} ${
            currentPath === "agent" ? styles.active : ""
          }`}
        >
          <Link href="/agent">agent</Link>
        </div>{" "}
        <div
          className={`${styles.tab} ${
            currentPath === "terminal" ? styles.active : ""
          }`}
        >
          <Link href="/terminal">terminal</Link>
        </div>{" "}
      </div>
      <div className={styles.walletConnect}>connect wallet</div>

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
          {/* do from here */}
          asd
          {/* do until here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
