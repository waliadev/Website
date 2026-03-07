"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { Bookmark, User, LogOut, LifeBuoy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import {ROUTES} from "@/constants/routes"

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [token] = useState(() => Cookies.get("token"));

  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => setOpen(false));

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    router.replace(ROUTES.SIGN_IN);
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="header">
      <nav className="navbar">

        {/* LEFT */}
        <div className="left" onClick={() => navigate("/")}>
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

              <button
                className="avatar"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((prev) => !prev)}
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
                      onClick={() => navigate(ROUTES.PROFILE)}
                    >
                      <User size={18} />
                      My Profile
                    </button>

                    <button
                      className="menuItem"
                      onClick={() => navigate(ROUTES.BOOKMARKS)}
                    >
                      <Bookmark size={18} />
                      Bookmarks
                    </button>

                    <button
                      className="menuItem"
                      onClick={() => navigate(ROUTES.EXPERT_HELP)}
                    >
                      <LifeBuoy size={18} />
                      Expert Help
                    </button>

                  </div>

                  <div className="dividerDark" />

                  <button
                    className="logoutDark"
                    onClick={handleLogout}
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
              onClick={() => navigate(ROUTES.SIGN_IN)}
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