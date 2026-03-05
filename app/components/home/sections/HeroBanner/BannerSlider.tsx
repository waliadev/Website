import styles from "@/app/components/home/styles/HeroBanner.module.css";
import { PUBLIC_BASE_URL } from "@/constants/api";

export default function BannerSlider({
  banners,
  currentSlide,
}: any) {
  const handleNavigate = (url?: string) => {
    if (!url || url.trim() === "") return;

    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    window.open(formattedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.heroBg}>
      {banners.map((banner: any, index: number) => {
        const imageUrl = `${PUBLIC_BASE_URL}${banner.image_url}`;

        return (
          <div
            key={banner.id}
            className={styles.bannerLink}
            onClick={() => handleNavigate(banner.link_url)}
          >
            <img
              src={imageUrl}
              alt={banner.title || "Banner"}
              className={`${styles.heroImage} ${
                index === currentSlide ? styles.active : ""
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}