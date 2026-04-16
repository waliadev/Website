import styles from "@/app/components/Home.module.css";


import DelhiIcon from "@/app/components/shared/icon/DelhiIcon";
import GhaziabadIcon from "@/app/components/shared/icon/GhaziabadIcon";
import GreaterNoidaIcon from "@/app/components/shared/icon/GreaterNoidaIcon";
import GurugramIcon from "@/app/components/shared/icon/GurugramIcon";
import NoidaIcon from "@/app/components/shared/icon/NoidaIcon";

const iconMap: Record<string, React.ElementType> = {
  Delhi: DelhiIcon,
  Ghaziabad: GhaziabadIcon,
  "Greater Noida": GreaterNoidaIcon,
  Gurgaon: GurugramIcon,
  Noida: NoidaIcon,
};

export default function CitySection({
  cities,
  selectedCityId,
  handleCityClick,
}: any) {
  return (
    <div className={styles.citySection}>
      <h3 className={styles.sectionTitle}>Explore by City</h3>

      <div className={styles.cityGrid}>
        {cities?.map((city: any) => {
          console.log("City Name:",city.image)
          const IconComponent = iconMap[city.name];

          return (
            <div
              key={city.id}
              className={`${styles.cityCard} ${selectedCityId === city.id ? styles.activeCity : ""
                }`}
              onClick={() => handleCityClick(city)}
            >
              <div className={styles.cityIconWrap}>
                   <img
                  src={city.image}
                  alt={city.name}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p style={{ color: "#335541" }}>{city.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}