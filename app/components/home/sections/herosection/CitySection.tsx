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
  Gurugram: GurugramIcon,
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
          const IconComponent = iconMap[city.name];

          return (
            <div
              key={city.id}
              className={`${styles.cityCard} ${
                selectedCityId === city.id ? styles.activeCity : ""
              }`}
              onClick={() => handleCityClick(city)}
            >
              <div className={styles.cityIconWrap}>
                {IconComponent && <IconComponent width={40} height={40} />}
              </div>
              <p style={{ color: "#335541" }}>{city.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}