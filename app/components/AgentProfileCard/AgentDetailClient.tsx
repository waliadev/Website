"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAgentDetail } from "@/store/slices/features/agents/agentListingSlice";

import BannerCarousel from "@/app/components/BannerCarousel";
import AgentProfileCard from "@/app/components/AgentProfileCard";
import ReviewsSection from "@/app/components/ReviewsSection";
import StickyContactSidebar from "@/app/components/StickyContactSidebar";

import styles from "@/app/(protected)/agent/[slug]/AgentDetail.module.css";

export default function AgentDetailClient({ agentId }: { agentId: number }) {
  const dispatch = useAppDispatch();

  const { agentDetail, agentDetailLoading, error } = useAppSelector(
    (state) => state.agentListing
  );
  console.log(agentDetail,"hh")
  // ✅ PAGE LOAD PE API CALL
useEffect(() => {
  if (agentId) {
    const str = agentId.toString();

    // 👉 extract only starting digits until large number starts
    const cleanAgentId = parseInt(str.slice(0, str.length - 13));

    dispatch(fetchAgentDetail({ agentId: cleanAgentId }));
  }
}, [agentId, dispatch]);

  if (agentDetailLoading) {
    return <div style={{ padding: 40 }}>Loading agent...</div>;
  }

  if (error) {
    return <div style={{ padding: 40 }}>Error: {error}</div>;
  }

  if (!agentDetail) {
    return <div style={{ padding: 40 }}>No agent found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <AgentProfileCard agent={agentDetail} />
        </div>
      </div>
    </div>
  );
}