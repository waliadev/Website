import styles from "@/app/components/home/styles/HeroBanner.module.css";

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
        // ✅ S3 URL already full hai
        const imageUrl = banner.image_url;

        return (
          <div
            key={banner.banner_id} // ✅ FIXED
            className={styles.bannerLink}
            onClick={() =>
              index === currentSlide && handleNavigate(banner.link_url)
            } // ✅ only active slide clickable
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