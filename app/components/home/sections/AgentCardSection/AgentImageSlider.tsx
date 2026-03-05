import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import styles from "@/app/components/home/styles/AgentCards.module.css";
import { PUBLIC_BASE_URL } from "@/constants/api";

export default function AgentImageSlider({
  images,
  name,
  rating,
  isSaved,
}: any) {
  const [index, setIndex] = useState(0);

  const imageList =
    images?.length > 0
      ? images.map((img: string) => `${PUBLIC_BASE_URL}/${img}`)
      : ["https://via.placeholder.com/400x300"];

  useEffect(() => {
    if (imageList.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === imageList.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <div className={styles.imageWrap}>
      <img src={imageList[index]} alt={name} />

      {isSaved && (
        <div className={styles.savedBadge}>Saved</div>
      )}

      {rating && (
        <div className={styles.rating}>
          <Star size={14} fill="#16a34a" stroke="none" />
          <span>{Number(rating).toFixed(1)}</span>
        </div>
      )}
    </div>
  );
}