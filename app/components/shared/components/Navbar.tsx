// "use client";

// import Image from "next/image";
// import styles from "../../Home.module.css";
// import { useState, useEffect, useRef } from "react";
// import Cookies from "js-cookie";
// import {
//   Bookmark,
//   User,
//   Pencil,
//   LogOut,
//   LifeBuoy 
// } from "lucide-react";
// import { useRouter } from "next/navigation";


// export default function Navbar() {
//  const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [token, setToken] = useState<string | undefined>();
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const t = Cookies.get("token");
//     setToken(t);
//   }, []);

//   // ✅ outside click close
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <header className={styles.header}>
//       <nav className={styles.navbar}>
//         {/* LEFT */}
//         <div className={styles.left} onClick={() => router.push('/')}>
//           <Image
//             src="/brokerdash-logo.png"
//             alt="BrokerDash"
//             width={42}
//             height={42}
//             priority
//           />
//           <h2 className={styles.brand}>
//             Broker<span>dash</span>
//           </h2>
//         </div>

//         {/* RIGHT */}
//         <div className={styles.right}>
//           {token ? (
//             <div className={styles.profileWrap} ref={menuRef}>
//               {/* bookmark */}
//               <button className={styles.iconBtn}>
//                 <Bookmark size={20} />
//               </button>

//               {/* avatar */}
//               <button
//                 className={styles.avatar}
//                 onClick={() => setOpen(!open)}
//               >
//                 V
//               </button>

//               {/* ✅ DARK DROPDOWN */}
//               {open && (
//                 <div className={styles.darkDropdown}>
//                   {/* user header */}
//                   <div className={styles.userHeader}>
//                     <div className={styles.userAvatar}>V</div>
//                     <div>
//                       <div className={styles.userName}>
//                         Vikas Kumar
//                       </div>
//                       <div className={styles.welcome}>
//                         Welcome back
//                       </div>
//                     </div>
//                   </div>

//                   <div className={styles.menuList} >
//                     <button className={styles.menuItem} onClick={() => router.push("/profile")}>
//                       <User size={18} />
//                       My Profile
//                     </button>

//                     <button className={styles.menuItem} onClick={() => router.push("/bookmarks")}>
//                       <Bookmark size={18} />
//                       Bookmarks
//                     </button>
                    
//                     <button className={styles.menuItem} onClick={() => router.push("/expert-help")}>
//                       <LifeBuoy size={18} />
//                         Expert Help
//                     </button>
//                   </div>

//                   <div className={styles.dividerDark} />

//                   <button className={styles.logoutDark} onClick={() => {
//                     Cookies.remove("token", { path: "/" });
//                     router.replace("/sign-in");
//                   }}>
//                     <LogOut size={18} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button className={styles.loginBtn} onClick={() => router.push("/sign-in")}>Login</button>
//           )}

//           <button className={styles.menuBtn}>☰</button>
//         </div>
//       </nav>
//     </header>
//   );
// }


"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import {
  Bookmark,
  User,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);
  }, []);

  // outside click close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        {/* LEFT */}
        <div className="left" onClick={() => router.push("/")}>
          <Image
            src="/brokerdash-logo.png"
            alt="BrokerDash"
            width={42}
            height={42}
            priority
          />
          <h2 className="brand">
            Broker<span>dash</span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="right">
          {token ? (
            <div className="profileWrap" ref={menuRef}>
              {/* <button className="iconBtn">
                <Bookmark size={20} />
              </button> */}

              <button
                className="avatar"
                onClick={() => setOpen(!open)}
              >
                V
              </button>

              {open && (
                <div className="darkDropdown">
                  <div className="userHeader">
                    <div className="userAvatar">V</div>
                    <div>
                      <div className="userName">Vikas Kumar</div>
                      <div className="welcome">Welcome back</div>
                    </div>
                  </div>

                  <div className="menuList">
                    <button
                      className="menuItem"
                      onClick={() => router.push("/profile")}
                    >
                      <User size={18} />
                      My Profile
                    </button>

                    <button
                      className="menuItem"
                      onClick={() => router.push("/bookmarks")}
                    >
                      <Bookmark size={18} />
                      Bookmarks
                    </button>

                    <button
                      className="menuItem"
                      onClick={() => router.push("/expert-help")}
                    >
                      <LifeBuoy size={18} />
                      Expert Help
                    </button>
                  </div>

                  <div className="dividerDark" />

                  <button
                    className="logoutDark"
                    onClick={() => {
                      Cookies.remove("token", { path: "/" });
                      router.replace("/sign-in");
                    }}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="loginBtn"
              onClick={() => router.push("/sign-in")}
            >
              Login
            </button>
          )}

          <button className="menuBtn">☰</button>
        </div>
      </nav>
    </header>
  );
}