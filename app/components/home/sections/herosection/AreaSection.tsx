import styles from "@/app/components/Home.module.css";

export default function AreaSection({
  areas,
  selectedAreaId,
  selectedCityName,
  handleAreaClick,
}: any) {
  if (!areas?.length) return null;

  return (
    <div className={styles.areaSection}>
      <h4 className={styles.sectionTitle}>
        Select a Areas in {selectedCityName}
      </h4>

      <div className={styles.chips}>
        {areas.map((area: any) => (
          <span
            key={area.id}
            onClick={() => handleAreaClick(area)}
            className={`${styles.chip} ${
              selectedAreaId === area.id ? styles.activeChip : ""
            }`}
          >
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );
}