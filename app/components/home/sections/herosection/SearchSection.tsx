import { useState } from "react";
import styles from "@/app/components/Home.module.css";


export default function SearchSection({
  searchedLocalities,
  searchLocalities,
  dispatch,
  setSelectedCityId,
  setSelectedCityName,
  setSelectedAreaId,
  setSelectedLocalityId,
}: any) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      dispatch(searchLocalities({ name: value }));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSearchSelect = (item: any) => {
    const breadcrumbText = `${item.locality_name}, ${item.city_name} → ${item.area_name}`;
    setQuery(breadcrumbText);

    setSelectedLocalityId(item.id);
    setSelectedCityId(item.city_id);
    setSelectedCityName(item.city_name);
    setSelectedAreaId(item.area_id);

    setShowDropdown(false);
  };

  return (
    <div className={styles.premiumSearchWrapper}>
      <div className={styles.premiumSearch}>
        <div className={styles.searchIconBox}>🔍</div>

        <input
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for area, locality, or city name"
          className={styles.premiumInput}
        />

        <button className={styles.searchActionBtn}>
          Search
        </button>
      </div>

      {showDropdown && searchedLocalities?.length > 0 && (
        <div className={styles.searchDropdown}>
          {searchedLocalities.map((item: any) => (
            <div
              key={item.id}
              className={styles.searchRow}
              onClick={() => handleSearchSelect(item)}
            >
              <div className={styles.localityName}>
                {item.locality_name}
              </div>
              <div className={styles.breadcrumb}>
                📍 {item.city_name} → {item.area_name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}