"use client";

import { useEffect } from "react";
import styles from "./Bookmarks.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import BookmarkHero from "@/app/components/BookmarkHero";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookmarks, toggleBookmark } from "@/store/slices/features/bookmark/bookmarkSlice";
import { PUBLIC_BASE_URL } from "@/constants/api";

type Agent = {
  agent_id: number;
  name: string;
  agency_name: string;
  rating: string;
  address: string;
  image_urls: string[];
};

export default function BookmarksPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { bookmarksData, loading } = useAppSelector(
    (state) => state.bookmark
  );

  /* 🔥 FETCH BOOKMARKS ON LOAD */
  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <BookmarkHero />

      <main className={styles.container}>
        {/* ===== HEADER ===== */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>My Bookmarks</h1>
        </div>

        {/* ===== LOADING ===== */}
        {loading && <p>Loading bookmarks...</p>}

        {/* ===== EMPTY STATE ===== */}
        {!loading && bookmarksData?.length === 0 && (
          <div className={styles.emptyBox}>
            <div className={styles.emptyIcon}>🔖</div>
            <h2>No bookmarks yet</h2>
            <p>
              You haven’t saved any agents yet.
              Start exploring and bookmark your favorites.
            </p>
          </div>
        )}

        {/* ===== GRID ===== */}
        {!loading && bookmarksData?.length > 0 && (
          <div className={styles.grid}>
            {bookmarksData.map((agent: Agent, key: number) => (
              <div key={key} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={
                      agent.image_urls?.[0]
                        ? `${PUBLIC_BASE_URL}/${agent.image_urls[0]}`
                        : "/no-image.png"
                    }
                    alt={agent.name}
                    fill
                    className={styles.image}
                  />

                  {/* 🔥 CLICK TO REMOVE */}
                  <button
                    className={styles.bookmarkBadge}
                    onClick={() =>
                      dispatch(toggleBookmark(agent.agent_id))
                    }
                  >
                    ★ Saved
                  </button>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{agent.name}</h3>
                  <p className={styles.agency}>{agent.agency_name}</p>
                  <p className={styles.address}>{agent.address}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.rating}>
                      ⭐ {agent.rating}
                    </span>

                    <button
                      className={styles.viewBtn}
                      onClick={() =>
                        router.push(`/agents/${agent.agent_id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}