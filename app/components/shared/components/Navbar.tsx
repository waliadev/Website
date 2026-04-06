"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Bookmark, User, LogOut, LifeBuoy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { getProfile } from "@/store/slices/features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/constants/routes";
import ProfileModal from "@/app/components/profile/ProfileModal";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // ✅ ADD

  const token = Cookies.get("token");
  const { profile } = useAppSelector((state) => state.profile);

  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => setOpen(false));

  useEffect(() => {
    if (!token) return;
    dispatch(getProfile());
  }, [token, dispatch]);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    router.replace(ROUTES.SIGN_IN);
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">

          {/* LEFT */}
          <div className="left" onClick={() => navigate("/")}>
            <Image src="/brokerdash-logo.png" alt="BrokerDash" width={42} height={42} priority />
            <h2 className="brand">
              Broker<span>Dash</span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="right">
            {token ? (
              <div className="profileWrap" ref={menuRef}>

                {/* Avatar */}
                <button
                  className="avatar"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                </button>

                {open && (
                  <div className="darkDropdown">

                    {/* HEADER */}
                    <div className="userHeader">
                      <div className="userAvatar">
                        {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <div className="userName">
                          {profile?.name || "User"}
                        </div>
                        <div className="welcome">Welcome back</div>
                      </div>
                    </div>

                    {/* MENU */}
                    <div className="menuList">

                      {/* ✅ OPEN MODAL */}
                      <button
                        className="menuItem"
                        onClick={() => {
                          setProfileOpen(true);
                          setOpen(false);
                        }}
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

                      <button className="menuItem">
                        <LifeBuoy size={18} />
                        Expert Help
                      </button>

                    </div>

                    <div className="dividerDark" />

                    <button className="logoutDark" onClick={handleLogout}>
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

      {/* ✅ MODAL */}
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
}