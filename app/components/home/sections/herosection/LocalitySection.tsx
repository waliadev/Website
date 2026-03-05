import styles from "@/app/components/Home.module.css";


export default function LocalitySection({
  localities,
  selectedLocalityId,
  setSelectedLocalityId,
}: any) {
  if (!localities?.length) return null;

  return (
    <div className={styles.areaSection}>
      <h4 className={styles.sectionTitle}>
        Popular Localities
      </h4>

      <div className={styles.chips}>
        {localities.map((loc: any) => (
          <span
            key={loc.id}
            onClick={() => setSelectedLocalityId(loc.id)}
            className={`${styles.chip} ${
              selectedLocalityId === loc.id ? styles.activeChip : ""
            }`}
          >
            {loc.name}
          </span>
        ))}
      </div>
    </div>
  );
}