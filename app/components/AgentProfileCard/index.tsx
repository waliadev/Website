"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Bookmark,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Mail
} from "lucide-react";

interface AgentProps {
  agent: any;
}import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleBookmark,fetchBookmarks } from "@/store/slices/features/bookmark/bookmarkSlice";
import { sendAgentInteraction } from "@/store/slices/features/interactions/interactionSlice";



export default function AgentProfileCard({ agent }: AgentProps) {
  const dispatch = useAppDispatch();
  const [activeImg, setActiveImg] = useState(0);
  const [distance, setDistance] = useState<string | null>(null);
    const { bookmarksData, loading } = useAppSelector(
    (state) => state.bookmark
  );

  const isBookmarked = bookmarksData.some(
  (item) => (item.agent_id ?? item.agent_id) === (agent.id ?? agent.id)
);

console.log(isBookmarked,"isBookmarked")


  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);



  useEffect(() => {
    if (!agent?.images?.length) return;

    const id = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % agent.images.length);
    }, 6000);

    return () => clearInterval(id);
  }, [agent?.images?.length]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: agent.name,
          text: `Check out this agent: ${agent.name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  const handleLocation = () => {
    if (!agent.latitude || !agent.longitude) {
      alert("Agent location not available");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const dist = calculateDistance(
          userLat,
          userLng,
          agent.latitude,
          agent.longitude
        );

        setDistance(dist.toFixed(2));

        // 🌍 Open Google Maps
        window.open(
          `https://www.google.com/maps/dir/${userLat},${userLng}/${agent.latitude},${agent.longitude}`,
          "_blank"
        );
      });
      dispatch(
        sendAgentInteraction({
          agentId: agent.id,
          click_type: "map",
          clicked_from: "browser",
        })
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  const addBookmark = (id: number) => {
    dispatch(toggleBookmark(id));
  };

  return (
    <div className="agent-page">
      {/* HERO */}
      <div className="hero">
        <img
          src={agent.images?.[activeImg]}
          alt={agent.name}
          className="hero-img"
        />
        <div className="hero-gradient" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="content-wrapper">
        {/* LEFT INFO CARD */}
        <div className="info-card">
          <div className="badge-row">
            <div className="rating-box">
              {agent.rating}
              <Star size={14} fill="#fff" stroke="#fff" />
            </div>
            <span className="review-text">
              {agent.total_reviews ? `${agent.total_reviews} reviews` : "No reviews"}
            </span>
            <span className="dot">•</span>
            <span className="location-text">
              <MapPin size={14} />

              <div className="location-wrapper">
                {/* 🏢 Office Detail */}
                <div className="office">
                  {agent.office_address || "Office not available"}
                </div>

                {/* 📍 Area / Locality */}
                <div className="area">
                  {agent.address || "Location not available"}
                </div>
              </div>
            </span>
          </div>

          <h1 className="agent-name">{agent.agency_name}</h1>
          <p className="agency-name">{agent.name}</p>

          <p className="description">{agent.description}</p>
        </div>

        {/* RIGHT CONTACT CARD */}
        <div className="contact-card">
          <a href={`tel:${agent.phone}`} className="btn primary" onClick={() => {
              dispatch(
                sendAgentInteraction({
                  agentId: agent.id,
                  click_type: "call",
                  clicked_from: "browser",
                })
              );
            }}>
            <Phone size={16}  />
            Call Agent
          </a>

          <a
            href={`https://wa.me/${agent.whatsapp_number}`}
            target="_blank"
            className="btn whatsapp"
             onClick={() => {
              dispatch(
                sendAgentInteraction({
                  agentId: agent.id,
                  click_type: "whatsapp",
                  clicked_from: "browser",
                })
              );
            }}
          >
            <MessageCircle size={16}  />
            WhatsApp
          </a>
          <button
            className="btn secondary"
            onClick={handleLocation}
          >
            <MapPin size={16} />
            View Location
          </button>

          <div className="icon-row">
            <Bookmark size={20} onClick={() => addBookmark(agent.id)}   
            fill={isBookmarked ? "#ff9800" : "#aaa"}
              color={isBookmarked ? "#ff9800" : "#aaa"}
                style={{ cursor: "pointer" }}
 />
            <Share2 size={20} onClick={handleShare} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .agent-page {
          background: #f3f4f6;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* HERO */

        .hero {
          position: relative;
          height: 420px;
          overflow: hidden;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
          transition: transform 6s ease;
        }

        .hero:hover .hero-img {
          transform: scale(1.1);
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.65)
          );
        }

        /* CONTENT */

        .content-wrapper {
          max-width: 1200px;
          margin: -120px auto 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          padding: 0 20px 80px;
        }

        /* INFO CARD */

        .info-card {
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          font-size: 14px;
          color: #4b5563;
        }

        .rating-box {
          background: #0f766e;
          color: white;
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .review-text {
          font-weight: 500;
        }

        .dot {
          color: #9ca3af;
        }

        .location-text {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .agent-name {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 6px;
          color: #111827;
        }

        .agency-name {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 30px;
        }

        .description {
          font-size: 16px;
          line-height: 1.8;
          color: #374151;
        }

        /* CONTACT CARD */

        .contact-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(15px);
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
          height: fit-content;
          position: sticky;
          top: 100px;
          transition: 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
        }

        .btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }

        .primary {
          background: #0f766e;
          color: white;
        }

        .primary:hover {
          background: #115e59;
          transform: translateY(-2px);
        }

        .whatsapp {
          background: #22c55e;
          color: white;
        }

        .whatsapp:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }

        .secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .secondary:hover {
          background: #d1d5db;
        }

        .icon-row {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-top: 15px;
          color: #6b7280;
          cursor: pointer;
        }

        .icon-row svg:hover {
          color: #0f766e;
          transform: scale(1.1);
          transition: 0.2s ease;
        }

        @media (max-width: 950px) {
          .content-wrapper {
            grid-template-columns: 1fr;
          }

          .contact-card {
            position: static;
          }

          .hero {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}