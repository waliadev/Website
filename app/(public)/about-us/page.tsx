"use client";

import { useEffect, useMemo } from "react";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function AboutPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { aboutUs, loading } = useSelector(
    (state: RootState) => state.config
  );

  console.log("About us Data ", aboutUs);

  // ✅ normalize (array ya object dono support)
  const aboutData = useMemo(() => {
    if (!aboutUs) return null;
    return Array.isArray(aboutUs) ? aboutUs[0] : aboutUs;
  }, [aboutUs]);

  // 🔥 extract Draft.js text
  const extractText = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      return parsed?.blocks?.map((b: any) => b.text).join("\n\n");
    } catch {
      return raw;
    }
  };

  // 🚀 Redux call (only when empty — PRO)
  useEffect(() => {
    if (!aboutUs) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, aboutUs]);

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="aboutHero">
        <div className="heroOverlay" />

        <div className="heroContent">
          <h1>About BrokerDash</h1>
          <p>
            Building trust between property seekers and
            verified real estate professionals.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="aboutWrapper">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <h2 className="title">
              {aboutData?.title || "About Us"}
            </h2>

            <div className="contentContainer">
              <p className="contentText">
                {extractText(aboutData?.content || "")}
              </p>
            </div>
          </>
        )}
      </section>

      <Footer />

      <style jsx>{`
        .aboutHero {
          position: relative;
          height: 320px;
          background-image: url(
            https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80
          );
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(2, 6, 23, 0.75),
            rgba(2, 6, 23, 0.9)
          );
        }

        .heroContent {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 20px;
        }

        .heroContent h1 {
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .heroContent p {
          font-size: 18px;
          opacity: 0.9;
        }

        .aboutWrapper {
          padding: 70px 20px;
          background: linear-gradient(
            135deg,
            #f8fafc,
            #eef2f7
          );
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loader {
          font-size: 18px;
          color: #64748b;
        }

        .title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          margin-bottom: 30px;
          text-align: center;
          color: #0f172a;
        }

        .contentContainer {
          width: 100%;
          max-width: 900px;
          line-height: 1.9;
        }

        .contentText {
          color: #334155;
          font-size: 17px;
          white-space: pre-line;
        }

        @media (max-width: 768px) {
          .aboutHero {
            height: 240px;
          }

          .contentText {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}