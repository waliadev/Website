"use client";

import { useEffect, useMemo } from "react";
import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppConfiguration } from "@/store/slices/features/config/configSlice";
import type { AppDispatch, RootState } from "@/store";

export default function ContactPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { contactUs, loading } = useSelector(
    (state: RootState) => state.config
  );

  // ✅ normalize (array ya object dono support)
  const contactData = useMemo(() => {
    if (!contactUs) return null;
    return Array.isArray(contactUs) ? contactUs[0] : contactUs;
  }, [contactUs]);

  // 🚀 call only when empty (important)
  useEffect(() => {
    if (!contactUs) {
      dispatch(fetchAppConfiguration());
    }
  }, [dispatch, contactUs]);

  // ✅ SAFE Draft.js parser (BOLD + LINK + EMAIL)
  const parseDraftContent = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const entityMap = parsed?.entityMap || {};

      return parsed?.blocks?.map((block: any, i: number) => {
        let text = block.text;

        const ranges = [
          ...(block.inlineStyleRanges || []).map((r: any) => ({
            ...r,
            type: "STYLE",
          })),
          ...(block.entityRanges || []).map((r: any) => ({
            ...r,
            type: "ENTITY",
          })),
        ];

        ranges
          .sort((a, b) => b.offset - a.offset)
          .forEach((range: any) => {
            const before = text.slice(0, range.offset);
            const middle = text.slice(
              range.offset,
              range.offset + range.length
            );
            const after = text.slice(range.offset + range.length);

            // 🔹 BOLD
            if (range.type === "STYLE" && range.style === "BOLD") {
              text = `${before}<strong>${middle}</strong>${after}`;
            }

            // 🔹 LINK / EMAIL
            if (range.type === "ENTITY") {
              const entity = entityMap[range.key];

              if (entity?.type === "LINK") {
                const urlFromEntity = entity?.data?.url || "";

                const emailRegex =
                  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

                let emailMatch =
                  urlFromEntity.match(emailRegex) ||
                  text.match(emailRegex);

                if (emailMatch) {
                  const email = emailMatch[0];

                  text = text.replace(
                    emailRegex,
                    `<a href="mailto:${email}" class="emailLink">${email}</a>`
                  );
                } else {
                  const url = urlFromEntity || "#";
                  text = `${before}<a href="${url}" target="_blank" rel="noopener noreferrer" class="emailLink">${middle}</a>${after}`;
                }
              }
            }
          });

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

      {/* ================= HERO ================= */}
      <section className="contactHero">
        <div className="heroOverlay" />

        <div className="heroContent">
          <h1>{contactData?.title || "Contact Support"}</h1>
          <p>Our team is here to assist you. Reach out anytime.</p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="contactWrapper">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="contentContainer">
            {parseDraftContent(contactData?.content || "")}
          </div>
        )}
      </section>

      <Footer />

      <style jsx>{`
        .contactHero {
          position: relative;
          height: 300px;
          background-image: url(
            https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&auto=format&fit=crop&q=80
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

        .heroContent h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 800; margin-bottom: 10px; } 
        .heroContent p { font-size: 18px; opacity: 0.9; }

        .contactWrapper {
          padding: 80px 20px;
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
          font-size: 17px;
        }

        :global(.emailLink) {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          overflow-wrap: anywhere;
        }

        :global(.emailLink:hover) {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}