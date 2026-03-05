// "use client";

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from "../styles/HeroBanner.module.css";
// import type { RootState } from "@/store";
// import Image from "next/image";
// import { PUBLIC_BASE_URL } from "@/constants/api";

// export default function HeroBanner() {
//   const { banners } = useSelector(
//     (state: RootState) => state.banner
//   );

//   const [currentSlide, setCurrentSlide] = useState(0);


//   useEffect(() => {
//     if (!banners?.length) return;

//     const slider = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % banners.length);
//     }, 3500);

//     return () => clearInterval(slider);
//   }, [banners]);

//   if (!banners?.length) return null;

//   const activeSlide = banners[currentSlide];
//   const handleNavigate = (url?: string) => {
//     alert("hekll")
//     if (!url || url.trim() === "") return;

//     // ensure https prefix
//     const formattedUrl =
//       url.startsWith("http://") || url.startsWith("https://")
//         ? url
//         : `https://${url}`;

//     window.open(formattedUrl, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <section className={styles.heroSection}>
//       <div className={styles.heroBg}>
//         {banners.map((banner: any, index: number) => {

//           // ✅ Correct URL
//           const imageUrl = `${PUBLIC_BASE_URL}${banner.image_url}`;

//           return (
//             <div
//               key={banner.id}
//               rel="noopener noreferrer"
//               className={styles.bannerLink}
//               onClick={() => handleNavigate(banner.link_url)}
//             >
//               <img
//                 src={imageUrl}
//                 onClick={() => handleNavigate(banner.link_url)}
//                 alt={banner.title || "Banner"}
//                 sizes="100vw"
//                 className={`${styles.heroImage} ${index === currentSlide ? styles.active : ""
//                   }`}
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className={styles.heroOverlay} />

//       <div className={styles.heroCenter}>
//         <h1 className={styles.heroTitle}>
//           {activeSlide.title}
//         </h1>

//         <p className={styles.heroSub}>
//           Discover verified brokers near you
//         </p>

//         <div className={styles.dots}>
//           {banners.map((_: any, i: number) => (
//             <span
//               key={i}
//               className={`${styles.dot} ${i === currentSlide ? styles.activeDot : ""
//                 }`}
//               onClick={() => setCurrentSlide(i)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import HeroBannerSection from "@/app/components/home/sections/HeroBanner";

export default function HeroBanner() {
  return <HeroBannerSection />;
}