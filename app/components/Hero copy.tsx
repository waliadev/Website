// "use client";

// import Image from "next/image";
// import styles from "./Home.module.css";
// import { useState } from "react";

// import DelhiIcon from "@/app/components/icon/DelhiIcon";
// import GhaziabadIcon from "@/app/components/icon/GhaziabadIcon";
// import GreaterNoidaIcon from "@/app/components/icon/GreaterNoidaIcon";
// import GurugramIcon from "@/app/components/icon/GurugramIcon";
// import NoidaIcon from "@/app/components/icon/NoidaIcon";

// // ✅ cities with components
// const cities = [
//     { name: "Delhi", Icon: DelhiIcon },
//     { name: "Ghaziabad", Icon: GhaziabadIcon },
//     { name: "Greater Noida", Icon: GreaterNoidaIcon },
//     { name: "Gurugram", Icon: GurugramIcon },
//     { name: "Noida", Icon: NoidaIcon },
// ];

// // 🔹 Delhi Areas
// const delhiAreas = [
//     "Central Delhi",
//     "East Delhi",
//     "West Delhi",
//     "North Delhi",
//     "South Delhi",
// ];

// // 🔹 Localities city-wise
// const localitiesMap: Record<string, string[]> = {
//     Delhi: [
//         "Connaught Place",
//         "Chandni Chowk",
//         "Karol Bagh",
//         "Lajpat Nagar",
//         "Dwarka",
//     ],
//     Ghaziabad: ["Raj Nagar", "Vaishali", "Indirapuram", "Kaushambi"],
//     "Greater Noida": ["Pari Chowk", "Alpha 1", "Beta 2", "Knowledge Park"],
//     Gurugram: ["DLF Phase 3", "Sohna Road", "MG Road", "Cyber City"],
//     Noida: ["Sector 62", "Sector 150", "Sector 18", "Noida Extension"],
// };

// export default function Hero() {
//     const [selectedCity, setSelectedCity] = useState<string | null>(null);
//     const [selectedArea, setSelectedArea] = useState<string | null>(null);

//     const showAreas = selectedCity === "Delhi" && !selectedArea;
//     const showLocalities =
//         selectedCity && (selectedCity !== "Delhi" || selectedArea);

//     return (
//         <section className={styles.hero}>
//             {/* LEFT */}
//             <div className={styles.heroLeft}>
//                 <h1 className={styles.heroTitle}>
//                     Find the Best Properties <br />
//                     & Brokers in Delhi NCR
//                 </h1>

//                 <p className={styles.heroDesc}>
//                     Search verified brokers for residential & commercial properties
//                     across Delhi, Noida, Gurugram, and more.
//                 </p>

//                 {/* SEARCH */}
//                 <div className={styles.heroSearch}>
//                     <div className={styles.searchInputWrap}>
//                         <span className={styles.searchIcon}>🔍</span>
//                         <input style={{color:"gray"}} placeholder="Search for area, locality, or street name" />
//                     </div>
//                     <button className={styles.searchBtn}>Search</button>
//                 </div>

//                 {/* ================= CITIES ================= */}
//                 <div className={styles.cityGrid}>
//                     {cities.map(({ name, Icon }) => (
//                         <div
//                             key={name}
//                             className={`${styles.cityCard} ${selectedCity === name ? styles.activeCity : ""
//                                 }`}
//                             onClick={() => {
//                                 setSelectedCity(name);
//                                 setSelectedArea(null);
//                             }}
//                         >
//                             <span className={styles.ripple} />

//                             <div className={styles.cityIconWrap}>
//                                 <Icon width={46} height={46} className={styles.citySvg} />
//                             </div>

//                             <p style={{color:"gray"}} className={styles.cityLabel}>{name}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* ================= DELHI AREAS ================= */}
//                 {showAreas && (
//                     <div className={styles.trendingWrap}>
//                         <h4>Select Area in Delhi:</h4>
//                         <div className={styles.chips}>
//                             {delhiAreas.map((area) => (
//                                 <span
//                                     key={area}
//                                     onClick={() => setSelectedArea(area)}
//                                     className={styles.clickableChip}
//                                 >
//                                     {area}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* ================= LOCALITIES ================= */}
//                 {showLocalities && (
//                     <div className={styles.trendingWrap}>
//                         <h4>Trending Localities:</h4>
//                         <div className={styles.chips}>
//                             {localitiesMap[selectedCity!]?.map((loc) => (
//                                 <span key={loc}>{loc}</span>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* RIGHT IMAGE */}
//             <div className={styles.heroRight}>
//                 <Image
//                     src="/hero-house.png"
//                     alt="house"
//                     width={520}
//                     height={420}
//                     priority
//                 />
//             </div>
//         </section>
//     );
// }




"use client";

import Image from "next/image";
import styles from "./Home.module.css";
import { useState } from "react";

// Icons
import DelhiIcon from "@/app/components/shared/icon/DelhiIcon";
import GhaziabadIcon from "@/app/components/shared/icon/GhaziabadIcon";
import GreaterNoidaIcon from "@/app/components/shared/icon/GreaterNoidaIcon";
import GurugramIcon from "@/app/components/shared/icon/GurugramIcon";
import NoidaIcon from "@/app/components/shared/icon/NoidaIcon";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreas } from "@/store/slices/features/location/locationSlice";
import type { AppDispatch, RootState } from "@/store";


interface HeroProps {
  cities: any[];
  loading: boolean;
  error: string | null;
}

// 🔹 Static Areas
const delhiAreas = [
  "Central Delhi",
  "East Delhi",
  "West Delhi",
  "North Delhi",
  "South Delhi",
];

// 🔹 Static Localities
const localitiesMap: Record<string, string[]> = {
  Delhi: [
    "Connaught Place",
    "Chandni Chowk",
    "Karol Bagh",
    "Lajpat Nagar",
    "Dwarka",
  ],
  Ghaziabad: ["Raj Nagar", "Vaishali", "Indirapuram", "Kaushambi"],
  "Greater Noida": ["Pari Chowk", "Alpha 1", "Beta 2", "Knowledge Park"],
  Gurugram: ["DLF Phase 3", "Sohna Road", "MG Road", "Cyber City"],
  Noida: ["Sector 62", "Sector 150", "Sector 18", "Noida Extension"],
};

// 🔹 Icon Mapping
const iconMap: Record<string, any> = {
  Delhi: DelhiIcon,
  Ghaziabad: GhaziabadIcon,
  "Greater Noida": GreaterNoidaIcon,
  Gurugram: GurugramIcon,
  Noida: NoidaIcon,
};

export default function Hero({
  cities,
  loading,
  error,
}: HeroProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const dispatch =useDispatch<AppDispatch>()

  const showAreas = selectedCity === "Delhi" && !selectedArea;
  const showLocalities =
    selectedCity && (selectedCity !== "Delhi" || selectedArea);

  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>
          Find the Best Properties <br />
          & Brokers in Delhi NCR
        </h1>

        <p className={styles.heroDesc}>
          Search verified brokers for residential & commercial properties
          across Delhi NCR.
        </p>

        {/* SEARCH */}
        <div className={styles.heroSearch}>
          <div className={styles.searchInputWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              style={{ color: "gray" }}
              placeholder="Search for area, locality, or street name"
            />
          </div>
          <button className={styles.searchBtn}>Search</button>
        </div>

        {/* ================= CITY SECTION ================= */}

        {loading && (
          <p style={{ color: "gray", marginTop: "20px" }}>
            Loading cities...
          </p>
        )}

        {error && (
          <p style={{ color: "red", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className={styles.cityGrid}>
            {cities?.map((city: any) => {
              const IconComponent = iconMap[city.name];

              return (
                <div
                  key={city.id}
                  className={`${styles.cityCard} ${
                    selectedCity === city.name
                      ? styles.activeCity
                      : ""
                  }`}
                  onClick={() => {
                    console.log(city,"selecyted")
                    setSelectedCity(city);
                    setSelectedArea(null);
                    dispatch(fetchAreas(city));
                  }}
                >
                  <span className={styles.ripple} />

                  <div className={styles.cityIconWrap}>
                    {IconComponent && (
                      <IconComponent
                        width={46}
                        height={46}
                        className={styles.citySvg}
                      />
                    )}
                  </div>

                  <p
                    style={{ color: "gray" }}
                    className={styles.cityLabel}
                  >
                    {city.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STATIC DELHI AREAS ================= */}
        {showAreas && (
          <div className={styles.trendingWrap}>
            <h4>Select Area in Delhi:</h4>
            <div className={styles.chips}>
              {delhiAreas.map((area) => (
                <span
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={styles.clickableChip}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ================= STATIC LOCALITIES ================= */}
        {showLocalities && (
          <div className={styles.trendingWrap}>
            <h4>Trending Localities:</h4>
            <div className={styles.chips}>
              {localitiesMap[selectedCity!]?.map((loc) => (
                <span key={loc}>{loc}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT IMAGE */}
      <div className={styles.heroRight}>
        <Image
          src="/hero-house.png"
          alt="house"
          width={520}
          height={420}
          priority
        />
      </div>
    </section>
  );
}