"use client";

import styles from "@/app/components/home/styles/AgentCards.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleBookmark } from "@/store/slices/features/bookmark/bookmarkSlice";
import { useRouter } from "next/navigation";
import { handleProtectedInteraction } from "@/utils/authGuard";
import { getToken } from "@/utils/token";

import AgentImageSlider from "@/app/components/home/sections/AgentCardSection/AgentImageSlider";
import AgentContent from "@/app/components/home/sections/AgentCardSection/AgentContent";
import { createSlug } from "@/utils/createSlug";
import { useEffect, useState } from "react";

interface Agent {
  agent_id: number;
  name: string;
  agency_name: string;
  rating: string | null;
  address: string;
  whatsapp_number: string;
  phone: string;
  image_urls: string[];
}

export default function AgentCard({ agent }: { agent: Agent }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);



  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);


  console.log("tken in card", token)

  const { bookmarks } = useAppSelector((state) => state.bookmark);
  const isSaved = bookmarks.includes(agent.agent_id);

  const handleBookmark = () => {
    dispatch(toggleBookmark(agent.agent_id));
  };

  const handleCall = () => {
    handleProtectedInteraction(dispatch, router, agent.agent_id, "call", () => {
      window.location.href = `tel:${agent.phone}`;
    });
  };

  const handleWhatsApp = () => {
    handleProtectedInteraction(
      dispatch,
      router,
      agent.agent_id,
      "whatsapp",
      () => {
        window.open(`https://wa.me/${agent.whatsapp_number}`, "_blank");
      }
    );
  };
const handleAgentDetails = (agentId: number, agentName: string): void => {
  if (!agentId) return;

  const freshToken = getToken(); // 🔥 direct cookie se

  if (!freshToken) {
    router.push("/auth/sign-in");
    return;
  }
  const slug = createSlug(agentName);
  router.push(`/agent/${slug}-${agentId}`);
};

  return (
    <div
      className={`${styles.card} ${isSaved ? styles.bookmarkedCard : ""
        }`}
      onClick={() => handleAgentDetails(agent.agent_id, agent.agency_name)}
    >
      <AgentImageSlider
        images={agent.image_urls}
        name={agent.name}
        rating={agent.rating}
        isSaved={isSaved}
      />

      <AgentContent
        agent={agent}
        token={token}
        isSaved={isSaved}
        handleBookmark={handleBookmark}
        handleCall={handleCall}
        handleWhatsApp={handleWhatsApp}
      />
    </div>
  );
}