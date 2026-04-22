"use client";

import styles from "./AgentCards.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleBookmark,
  fetchBookmarks,
} from "@/store/slices/features/bookmark/bookmarkSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiPhone, FiShare2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { createSlug } from "@/utils/createSlug";
import { getToken } from "@/utils/token";
import { handleProtectedAction } from "@/utils/protectedAction";

export default function AgentCard({ agent }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [distance, setDistance] = useState<number | null>(null);

  // ================= IMAGE =================
  const imageList = useMemo(() => {
    return agent.image_urls?.length > 0
      ? agent.image_urls
      : ["https://via.placeholder.com/400x300"];
  }, [agent.image_urls]);

  // ================= INIT =================
  useEffect(() => {
    setToken(getToken());
    dispatch(fetchBookmarks());
  }, [dispatch]);

  // ================= SLIDER =================
  useEffect(() => {
    if (imageList.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageList]);

  // ================= DISTANCE =================
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;

      const agentLat = parseFloat(agent.latitude);
      const agentLon = parseFloat(agent.longitude);

      if (agentLat && agentLon) {
        const dist = getDistance(userLat, userLon, agentLat, agentLon);
        setDistance(dist);
      }
    });
  }, [agent.latitude, agent.longitude]);

  const { bookmarksData } = useAppSelector((state) => state.bookmark);

  const isSaved = bookmarksData.some(
    (item: any) => item.agent_id === agent.agent_id
  );

  // ================= ACTIONS =================

  const handleBookmark = (e: any) => {
    e.stopPropagation();
    handleProtectedAction(router, () => {
      dispatch(toggleBookmark(agent.agent_id));
    });
  };

  const handleCall = (e: any) => {
    e.stopPropagation();
    handleProtectedAction(router, () => {
      window.location.href = `tel:${agent.phone}`;
    });
  };

  const handleWhatsApp = (e: any) => {
    e.stopPropagation();
    handleProtectedAction(router, () => {
      window.open(`https://wa.me/${agent.whatsapp_number}`, "_blank");
    });
  };

  const handleMap = (e: any) => {
    e.stopPropagation();

    handleProtectedAction(router, () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${agent.latitude},${agent.longitude}&travelmode=driving`,
          "_blank"
        );
      });
    });
  };

  const handleShare = (e: any) => {
    e.stopPropagation();

    const slug = createSlug(agent.agency_name || agent.name);
    const url = `${window.location.origin}/agent/${slug}-${agent.agent_id}`;

    if (navigator.share) {
      navigator.share({
        title: agent.agency_name,
        text: `Check out ${agent.agency_name}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const handleDetails = () => {
    const slug = createSlug(agent.agency_name || agent.name);
    router.push(`/agent/${slug}-${agent.agent_id}`);
  };

  // ================= UI =================

  return (
    <div className={styles.card} onClick={handleDetails}>
      
      {/* IMAGE */}
      <div className={styles.imageBox}>
        <img src={imageList[index]} alt={agent.name} />

        {imageList.length > 1 && (
          <div className={styles.dots}>
            {imageList.map((_: any, i: number) => (
              <span
                key={i}
                className={`${styles.dot} ${
                  i === index ? styles.activeDot : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        
        <div className={styles.top}>
          <div>
            <h3>{agent.agency_name}</h3>
            <p className={styles.agentName}>👤 {agent.name}</p>
          </div>

          <div className={styles.rightTop}>
            {agent.rating && (
              <span className={styles.rating}>
                {Number(agent.rating).toFixed(1)} ★
              </span>
            )}

            <div className={styles.iconRow}>
              <div className={styles.icon} onClick={handleMap}>
                <MapPin size={18} />
              </div>

              <div className={styles.icon} onClick={handleBookmark}>
                {isSaved ? <BsBookmarkFill size={18} /> : <BsBookmark size={18} />}
              </div>

              <div className={styles.icon} onClick={handleShare}>
                <FiShare2 size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.location}>
          <MapPin size={16} />
          <span>{agent.office_address}</span>

          {distance && (
            <span className={styles.distance}>
              • {distance.toFixed(1)} km away
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className={styles.actionButtons}>
          <button className={styles.callBtn} onClick={handleCall}>
            <FiPhone size={18} /> Call
          </button>

          <button className={styles.whatsappBtn} onClick={handleWhatsApp}>
            <FaWhatsapp size={18} /> WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}