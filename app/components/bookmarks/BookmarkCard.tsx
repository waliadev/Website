"use client";

import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";
import { toggleBookmark } from "@/store/slices/features/bookmark/bookmarkSlice";
import { PUBLIC_BASE_URL } from "@/constants/api";

export default function BookmarkCard({ agent }: any){

  const router = useRouter();
  const dispatch = useAppDispatch();

  return(

    <motion.div
      whileHover={{ y: -8 }}
      className={styles.card}
    >

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

        <button
          className={styles.bookmark}
          onClick={()=>dispatch(toggleBookmark(agent.agent_id))}
        >
          ❤️
        </button>

      </div>

      <div className={styles.content}>

        <h3>{agent.name}</h3>

        <p className={styles.agency}>
          {agent.agency_name}
        </p>

        <p className={styles.address}>
          {agent.address}
        </p>

        <div className={styles.footer}>

          <span className={styles.rating}>
            ⭐ {agent.rating}
          </span>

          <button
            className={styles.viewBtn}
            onClick={()=>router.push(`/agents/${agent.agent_id}`)}
          >
            View
          </button>

        </div>

      </div>

    </motion.div>

  );

}