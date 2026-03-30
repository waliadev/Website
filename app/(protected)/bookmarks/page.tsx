

"use client";

import { useEffect } from "react";
import styles from "./Bookmarks.module.css";

import Navbar from "@/app/components/shared/components/Navbar";
import Footer from "@/app/components/shared/components/Footer";
import BookmarkHero from "@/app/components/bookmarks/BookmarkHero";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookmarks } from "@/store/slices/features/bookmark/bookmarkSlice";

import BookmarkHeader from "@/app/components/bookmarks/BookmarkHeader";
import BookmarkEmpty from "@/app/components/bookmarks/BookmarkEmpty";
import BookmarkGrid from "@/app/components/bookmarks/BookmarkGrid";

export default function BookmarksPage() {

  const dispatch = useAppDispatch();

  const { bookmarksData, loading } = useAppSelector(
    (state) => state.bookmark
  );

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <BookmarkHero />

      <main className="container">

        <BookmarkHeader />

        {loading && <p>Loading bookmarks...</p>}

        {!loading && bookmarksData?.length === 0 && (
          <BookmarkEmpty />
        )}

        {!loading && bookmarksData?.length > 0 && (
          <BookmarkGrid agents={bookmarksData} />
        )}

      </main>

      <Footer />
    </>
  );
}