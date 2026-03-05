"use client";

import { useEffect, useMemo } from "react";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function TermsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { terms, loading } = useSelector(
    (state: RootState) => state.config
  );

  // ✅ normalize (array ya object dono support)
  const termsData = useMemo(() => {
    if (!terms) return null;
    return Array.isArray(terms) ? terms[0] : terms;
  }, [terms]);

  // 🚀 call only when empty (IMPORTANT)
  useEffect(() => {
    if (!terms) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, terms]);

  // ✅ SAFE Draft.js parser
  const renderDraftContent = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const entityMap = parsed?.entityMap || {};

      return parsed?.blocks?.map((block: any, i: number) => {
        let text = block.text;

        // 🔹 BOLD
        if (block.inlineStyleRanges?.length) {
          block.inlineStyleRanges.forEach((range: any) => {
            if (range.style === "BOLD") {
              const before = text.slice(0, range.offset);
              const boldPart = text.slice(
                range.offset,
                range.offset + range.length
              );
              const after = text.slice(range.offset + range.length);
              text = `${before}<strong>${boldPart}</strong>${after}`;
            }
          });
        }

        // 🔹 LINK
        if (block.entityRanges?.length) {
          block.entityRanges.forEach((range: any) => {
            const entity = entityMap[range.key];

            if (entity?.type === "LINK") {
              const url = entity?.data?.url || "#";

              const before = text.slice(0, range.offset);
              const linkText = text.slice(
                range.offset,
                range.offset + range.length
              );
              const after = text.slice(range.offset + range.length);

              text = `${before}<a href="${url}" target="_blank" rel="noopener noreferrer" class="linkText">${linkText}</a>${after}`;
            }
          });
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
        );
      });
    } catch {
      return <p>{raw}</p>;
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="termsHero">
        <div className="heroOverlay" />

        <div className="heroContent">
          <h1>{termsData?.title || "Terms & Conditions"}</h1>
          <p>
            Please read these terms carefully before using BrokerDash services.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="termsWrapper">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="contentContainer">
            {renderDraftContent(termsData?.content || "")}
          </div>
        )}
      </section>

      <Footer />

      <style jsx global>{`
        .termsHero {
          position: relative;
          height: 300px;
          background-image: url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80);
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(2, 6, 23, 0.75), rgba(2, 6, 23, 0.9));
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

        .termsWrapper {
          padding: 70px 20px;
          background: linear-gradient(135deg, #f8fafc, #eef2f7);
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
          font-size: 16px;
        }

        .contentContainer p {
          margin-bottom: 14px;
        }

        .contentContainer strong {
          color: #0f172a;
          font-weight: 700;
        }

        .linkText {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .termsHero {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
}