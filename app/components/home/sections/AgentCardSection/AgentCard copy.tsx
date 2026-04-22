"use client";

import styles from "@/app/components/home/styles/AgentCards.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookmarks, toggleBookmark } from "@/store/slices/features/bookmark/bookmarkSlice";
import { useRouter } from "next/navigation";
import { handleProtectedInteraction } from "@/utils/authGuard";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { createSlug } from "@/utils/createSlug";

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
    setToken(getToken());
    dispatch(fetchBookmarks());
  }, []);

  const { bookmarksData } = useAppSelector((state) => state.bookmark);

  const isSaved = bookmarksData.some(
    (item) => item.agent_id === agent.agent_id
  );

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleBookmark(agent.agent_id));
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${agent.phone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/${agent.whatsapp_number}`, "_blank");
  };

  const handleDetails = () => {
    const slug = createSlug(agent.agency_name);
    router.push(`/agent/${slug}-${agent.agent_id}`);
  };

  return (
    <div className={styles.card} onClick={handleDetails}>
      
      {/* LEFT IMAGE */}
      <div className={styles.left}>
        <img
          src={agent.image_urls?.[0] || "https://via.placeholder.com/400"}
          alt={agent.name}
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className={styles.right}>
        
        {/* TOP */}
        <div className={styles.topRow}>
          <h3>{agent.agency_name}</h3>
          
          {agent.rating && (
            <span className={styles.rating}>
              {Number(agent.rating).toFixed(1)}
            </span>
          )}
        </div>

        {/* ICONS */}
        <div className={styles.icons}>
          <button onClick={handleCall}>
            <FiPhone />
          </button>

          <button onClick={handleWhatsApp}>
            <FaWhatsapp />
          </button>

          <button>
            <MapPin />
          </button>

          {token && (
            <button onClick={handleBookmark}>
              {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
            </button>
          )}
        </div>

        {/* ADDRESS */}
        <div className={styles.location}>
          <MapPin size={14} />
          <span>{agent.address}</span>
        </div>
      </div>
    </div>
  );
}