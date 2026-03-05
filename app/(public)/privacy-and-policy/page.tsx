"use client";

import { useEffect, useMemo } from "react";
import draftToHtml from "draftjs-to-html";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function PrivacyPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { privacyPolicy, loading } = useSelector(
    (state: RootState) => state.config
  );

  // ✅ normalize (array ya object dono support)
  const privacyData = useMemo(() => {
    if (!privacyPolicy) return null;
    return Array.isArray(privacyPolicy)
      ? privacyPolicy[0]
      : privacyPolicy;
  }, [privacyPolicy]);

  // 🚀 call only when empty (IMPORTANT)
  useEffect(() => {
    if (!privacyPolicy) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, privacyPolicy]);

  // ✅ INDUSTRY STANDARD RENDERER
  const renderContent = (raw: string) => {
    if (!raw) return null;

    try {
      const html = draftToHtml(JSON.parse(raw));
      return (
        <div
          className="legalContent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      return (
        <div
          className="legalContent"
          dangerouslySetInnerHTML={{ __html: raw }}
        />
      );
    }
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="privacyHero">
        <div className="heroOverlay" />

        <div className="heroContent">
          <h1>{privacyData?.title || "Privacy Policy"}</h1>
          <p>
            Your privacy is important to us. Learn how we
            collect and protect your information.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="privacyWrapper">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="contentContainer">
            {renderContent(privacyData?.content || "")}
          </div>
        )}
      </section>

      <Footer />

      <style jsx>{`
        .privacyHero {
          position: relative;
          height: 300px;
          background-image: url(
            https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop&q=80
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
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .heroContent p {
          font-size: 18px;
          opacity: 0.9;
        }

        .privacyWrapper {
          padding: 70px 20px;
          background: linear-gradient(
            135deg,
            #f8fafc,
            #eef2f7
          );
          display: flex;
          justify-content: center;
        }

        .loader {
          font-size: 18px;
          color: #64748b;
        }

        .contentContainer {
          width: 100%;
          max-width: 900px;
          line-height: 1.9;
          color: #334155;
          font-size: 15.5px;
        }

        .legalContent h1,
        .legalContent h2,
        .legalContent h3 {
          color: #0f172a;
          font-weight: 700;
          margin-top: 28px;
          margin-bottom: 12px;
        }

        .legalContent h1 {
          font-size: 26px;
        }

        .legalContent h2 {
          font-size: 22px;
        }

        .legalContent h3 {
          font-size: 18px;
        }

        .legalContent p {
          margin-bottom: 12px;
        }

        .legalContent strong {
          font-weight: 700;
          color: #020617;
        }

        .legalContent ol,
        .legalContent ul {
          padding-left: 22px;
          margin-bottom: 14px;
        }

        .legalContent li {
          margin-bottom: 6px;
        }

        @media (max-width: 768px) {
          .privacyHero {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
}