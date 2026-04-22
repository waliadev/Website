"use client";

import styles from "../styles/AgentCards.module.css";
import { useAppSelector } from "@/store/hooks";
import AgentCard from "@/app/components/home/sections/AgentCardSection/AgentCard";

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

export default function AgentCards() {
  const { agents } = useAppSelector((state) => state.agentListing);

  if (!agents?.length) return null;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Top Property Agents</h2>
       {/* className={styles.grid} */}
      <div >
        {agents.map((agent: Agent) => (
          <AgentCard key={agent.agent_id} agent={agent} />
        ))}
      </div>
    </section>
  );
}