// "use client";

// import Image from "next/image";
// import styles from "../../Home.module.css";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchCities,
//   fetchAreas,
//   fetchLocalities,
//   searchLocalities,
// } from "@/store/slices/features/location/locationSlice";

// import { fetchAgentsByLocation } from "@/store/slices/features/agents/agentListingSlice";
// import { fetchActiveBanners } from "@/store/slices/features/banner/bannerSlice";

// import type { AppDispatch, RootState } from "@/store";

// // Icons
// import DelhiIcon from "@/app/components/shared/icon/DelhiIcon";
// import GhaziabadIcon from "@/app/components/shared/icon/GhaziabadIcon";
// import GreaterNoidaIcon from "@/app/components/shared/icon/GreaterNoidaIcon";
// import GurugramIcon from "@/app/components/shared/icon/GurugramIcon";
// import NoidaIcon from "@/app/components/shared/icon/NoidaIcon";

// const iconMap: Record<string, React.ElementType> = {
//   Delhi: DelhiIcon,
//   Ghaziabad: GhaziabadIcon,
//   "Greater Noida": GreaterNoidaIcon,
//   Gurugram: GurugramIcon,
//   Noida: NoidaIcon,
// };

// export default function Hero() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { cities, areas, localities, searchedLocalities } =
//     useSelector((state: RootState) => state.location);

//   const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
//   const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
//   const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
//   const [selectedLocalityId, setSelectedLocalityId] = useState<number | null>(null);
//   const [query, setQuery] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);

//   /* ================= INITIAL FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchCities());
//   }, [dispatch]);

//   /* ================= FETCH BANNERS ================= */
//   useEffect(() => {
//     if (selectedCityId) {
//       dispatch(fetchActiveBanners({ city_id: selectedCityId }));
//     }
//   }, [selectedCityId, dispatch]);

//   /* ================= FETCH AGENTS ================= */
//   useEffect(() => {
//     if (selectedLocalityId) {
//       dispatch(fetchAgentsByLocation({ locationId: selectedLocalityId }));
//     }
//   }, [selectedLocalityId, dispatch]);

//   /* ================= CITY CLICK ================= */
//   const handleCityClick = (city: any) => {
//     setSelectedCityId(city.id);
//     setSelectedCityName(city.name);
//     setSelectedAreaId(null);
//     setSelectedLocalityId(null);

//     if (city.name === "Delhi") {
//       dispatch(fetchAreas({ id: city.id }));
//     } else {
//       dispatch(fetchLocalities({ cityId: city.id }));
//     }
//   };

//   /* ================= AREA CLICK ================= */
//   const handleAreaClick = (area: any) => {
//     if (!selectedCityId) return;

//     setSelectedAreaId(area.id);
//     setSelectedLocalityId(null);

//     dispatch(
//       fetchLocalities({
//         cityId: selectedCityId,
//         areaId: area.id,
//       })
//     );
//   };

//   /* ================= SEARCH INPUT CHANGE ================= */
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (value.trim().length > 0) {
//       dispatch(searchLocalities({ name: value }));
//       setShowDropdown(true);
//     } else {
//       setShowDropdown(false);
//     }
//   };

//   /* ================= SEARCH DROPDOWN CLICK ================= */
//   const handleSearchSelect = (item: any) => {
//     // 1️⃣ Set search input text as breadcrumb
//     const breadcrumbText = `${item.locality_name}, ${item.city_name} → ${item.area_name}`;
//     setQuery(breadcrumbText);

//     // 2️⃣ Set selected locality
//     setSelectedLocalityId(item.id);

//     // 3️⃣ Optional: Set city and area also (for UI consistency)
//     setSelectedCityId(item.city_id);
//     setSelectedCityName(item.city_name);
//     setSelectedAreaId(item.area_id);

//     // 4️⃣ Close dropdown
//     setShowDropdown(false);
//   };

//   /* ================= UI ================= */

//   return (
//     <section className={styles.hero}>
//       <div className={styles.heroLeft}>
//         <h1 className={styles.heroTitle}>
//           Find the Best Properties <br />
//           & Brokers in Delhi NCR
//         </h1>

//         <p className={styles.heroDesc}>
//           Search verified brokers across Delhi, Noida, Gurugram & NCR.
//         </p>

//         {/* ================= SEARCH ================= */}
//         <div className={styles.premiumSearchWrapper}>
//           <div className={styles.premiumSearch}>
//             <div className={styles.searchIconBox}>🔍</div>

//             <input
//               value={query}
//               onChange={handleSearchChange}
//               placeholder="Search for area, locality, or street name"
//               className={styles.premiumInput}
//               onFocus={() => {
//                 if (searchedLocalities?.length > 0) {
//                   setShowDropdown(true);
//                 }
//               }}
//             />

//             <button className={styles.searchActionBtn}>
//               Search
//             </button>
//           </div>

//           {/* ================= DROPDOWN ================= */}
//           {showDropdown && searchedLocalities?.length > 0 && (
//             <div className={styles.searchDropdown}>
//               {searchedLocalities.map((item: any) => (
//                 <div
//                   key={item.id}
//                   className={styles.searchRow}
//                   onClick={() => handleSearchSelect(item)}
//                 >
//                   <div className={styles.localityName}>
//                     {item.locality_name}
//                   </div>
//                   <div className={styles.breadcrumb}>
//                     📍 {item.city_name} → {item.area_name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ================= CITY SECTION ================= */}
//         <div className={styles.citySection}>
//           <h3 className={styles.sectionTitle}>Explore by City</h3>

//           <div className={styles.cityGrid}>
//             {cities?.map((city: any) => {
//               const IconComponent = iconMap[city.name];

//               return (
//                 <div
//                   key={city.id}
//                   className={`${styles.cityCard} ${
//                     selectedCityId === city.id ? styles.activeCity : ""
//                   }`}
//                   onClick={() => handleCityClick(city)}
//                 >
//                   <div className={styles.cityIconWrap}>
//                     {IconComponent && (
//                       <IconComponent width={40} height={40} />
//                     )}
//                   </div>
//                   <p style={{ color: "#335541" }}>{city.name}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= AREAS ================= */}
//         {areas?.length > 0 && (
//           <div className={styles.areaSection}>
//             <h4 className={styles.sectionTitle}>
//               Areas in {selectedCityName}
//             </h4>

//             <div className={styles.chips}>
//               {areas.map((area: any) => (
//                 <span
//                   key={area.id}
//                   onClick={() => handleAreaClick(area)}
//                   className={`${styles.chip} ${
//                     selectedAreaId === area.id ? styles.activeChip : ""
//                   }`}
//                 >
//                   {area.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ================= LOCALITIES ================= */}
//         {localities?.length > 0 && (
//           <div className={styles.areaSection}>
//             <h4 className={styles.sectionTitle}>
//               Popular Localities
//             </h4>

//             <div className={styles.chips}>
//               {localities.map((loc: any) => (
//                 <span
//                   key={loc.id}
//                   onClick={() => setSelectedLocalityId(loc.id)}
//                   className={`${styles.chip} ${
//                     selectedLocalityId === loc.id ? styles.activeChip : ""
//                   }`}
//                 >
//                   {loc.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className={styles.heroRight}>
//         <Image
//           src="/hero-house.png"
//           alt="house"
//           width={520}
//           height={420}
//           priority
//         />
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";

import {
  fetchCities,
  fetchAreas,
  fetchLocalities,
  searchLocalities,
} from "@/store/slices/features/location/locationSlice";

import { fetchAgentsByLocation } from "@/store/slices/features/agents/agentListingSlice";
import { fetchActiveBanners } from "@/store/slices/features/banner/bannerSlice";

import styles from "../../Home.module.css";

import SearchSection from "@/app/components/home/sections/herosection/SearchSection";
import CitySection from "@/app/components/home/sections/herosection/CitySection";
import AreaSection from "@/app/components/home/sections/herosection/AreaSection";
import LocalitySection from "@/app/components/home/sections/herosection/LocalitySection";
import HeroRight from "@/app/components/home/sections/herosection/HeroRight";
import { HOME_HERO } from "@/constants/home";

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();

  const { cities, areas, localities, searchedLocalities } =
    useSelector((state: RootState) => state.location);

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedLocalityId, setSelectedLocalityId] = useState<number | null>(null);

  /* ================= INITIAL FETCH ================= */
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  /* ================= FETCH BANNERS ================= */
  useEffect(() => {
    if (selectedCityId) {
      dispatch(fetchActiveBanners({ city_id: selectedCityId }));
    }
  }, [selectedCityId, dispatch]);

  /* ================= FETCH AGENTS ================= */
  useEffect(() => {
    if (selectedLocalityId) {
      dispatch(fetchAgentsByLocation({ locationId: selectedLocalityId }));
    }
  }, [selectedLocalityId, dispatch]);

  /* ================= CITY CLICK ================= */
  const handleCityClick = (city: any) => {
    setSelectedCityId(city.id);
    setSelectedCityName(city.name);
    setSelectedAreaId(null);
    setSelectedLocalityId(null);

    if (city.name === "Delhi") {
      dispatch(fetchAreas({ id: city.id }));
    } else {
      dispatch(fetchLocalities({ cityId: city.id }));
    }
  };

  /* ================= AREA CLICK ================= */
  const handleAreaClick = (area: any) => {
    if (!selectedCityId) return;

    setSelectedAreaId(area.id);
    setSelectedLocalityId(null);

    dispatch(
      fetchLocalities({
        cityId: selectedCityId,
        areaId: area.id,
      })
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>
            {HOME_HERO.TITLE} <br />
          {HOME_HERO.TITLE_SECOND}
        </h1>

        <p className={styles.heroDesc}>
          {HOME_HERO.DESCRIPTION}
        </p>

        <SearchSection
          searchedLocalities={searchedLocalities}
          searchLocalities={searchLocalities}
          dispatch={dispatch}
          setSelectedCityId={setSelectedCityId}
          setSelectedCityName={setSelectedCityName}
          setSelectedAreaId={setSelectedAreaId}
          setSelectedLocalityId={setSelectedLocalityId}
        />

        <CitySection
          cities={cities}
          selectedCityId={selectedCityId}
          handleCityClick={handleCityClick}
        />

        <AreaSection
          areas={areas}
          selectedAreaId={selectedAreaId}
          selectedCityName={selectedCityName}
          handleAreaClick={handleAreaClick}
        />

        <LocalitySection
          localities={localities}
          selectedLocalityId={selectedLocalityId}
          setSelectedLocalityId={setSelectedLocalityId}
        />
      </div>

      <HeroRight />
    </section>
  );
}