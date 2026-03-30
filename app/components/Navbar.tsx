"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar(): React.ReactElement {
  // ================================
  // STATE
  // ================================
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const userName: string = "Vikas Kumar";
  const initial: string = userName.charAt(0).toUpperCase();

  const menuRef = useRef<HTMLLIElement | null>(null);

  // ================================
  // CHECK TOKEN
  // ================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ================================
  // OUTSIDE CLICK CLOSE
  // ================================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================================
  // LOGOUT
  // ================================
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/sign-in";
  };

  // ================================
  // JSX
  // ================================
  return (
    <nav className={styles.navbar}>
      {/* LOGO */}
      <div className={styles.logo}>
        <span className={styles.logoBroker}>Broker</span>
        <span className={styles.logoDash}>Dash</span>
      </div>

      {/* DESKTOP NAV */}
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
        </li>
        <li>
          <Link href="/privacy-and-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </li>
        <li>
          <Link href="/contact-us">Contact Us</Link>
        </li>

        {!isLoggedIn ? (
          <li className={styles.loginBtn}>
            <Link href="/auth/sign-in">Login</Link>
          </li>
        ) : (
          <li className={styles.profileMenu} ref={menuRef}>
            <button
              className={styles.profileTrigger}
              onClick={() => setOpen((prev) => !prev)}
              type="button"
            >
              <div className={styles.avatar}>{initial}</div>
              <span className={styles.accText}>Account</span>
              <span
                className={`${styles.arrow} ${open ? styles.rotate : ""}`}
              >
                ▾
              </span>
            </button>

            {open && (
              <div className={styles.dropdown}>
                {/* HEADER */}
                <div className={styles.dropHeader}>
                  <div className={`${styles.avatar} ${styles.big}`}>
                    {initial}
                  </div>
                  <div>
                    <div className={styles.name}>{userName}</div>
                    <div className={styles.email}>Welcome back</div>
                  </div>
                </div>

                <div className={styles.divider} />

                <Link href="/profile" className={styles.dropItem}>
                  <span className={styles.icon}>👤</span>
                  <span>My Profile</span>
                </Link>

                <Link href="/profile/edit" className={styles.dropItem}>
                  <span className={styles.icon}>✏️</span>
                  <span>Update Profile</span>
                </Link>

                <Link href="/bookmarks" className={styles.dropItem}>
                  <span className={styles.icon}>🔖</span>
                  <span>Bookmarks</span>
                </Link>

                <div className={styles.divider} />

                <button
                  onClick={handleLogout}
                  className={`${styles.dropItem} ${styles.logout}`}
                  type="button"
                >
                  <span className={styles.icon}>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </li>
        )}
      </ul>

      {/* HAMBURGER */}
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen((prev) => !prev)}
        type="button"
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/privacy-and-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Link href="/contact-us">Contact Us</Link>

          {!isLoggedIn ? (
            <Link href="/auth/sign-in" className={styles.mobileLogin}>
              Login
            </Link>
          ) : (
            <div className={styles.mobileProfile}>
              <div className={styles.mobileProfileHeader}>
                <div className={`${styles.avatar} ${styles.big}`}>
                  {initial}
                </div>
                <div>
                  <div className={styles.name}>{userName}</div>
                  <div className={styles.email}>Welcome back</div>
                </div>
              </div>

              <Link href="/profile" className={styles.dropItem}>
                👤 My Profile
              </Link>

              <Link href="/profile/edit" className={styles.dropItem}>
                ✏️ Update Profile
              </Link>

              <Link href="/bookmarks" className={styles.dropItem}>
                🔖 Bookmarks
              </Link>

              <button
                onClick={handleLogout}
                className={`${styles.dropItem} ${styles.logout}`}
                type="button"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}