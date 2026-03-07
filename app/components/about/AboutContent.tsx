import styles from "@/app/components/about/styles/AboutContent.module.css";

interface Props {
  title?: string;
  content?: string;
}

export default function AboutContent({ title, content }: Props) {
  return (
    <section className={styles.wrapper}>

      <h2 className={styles.title}>
        {title || "About Us"}
      </h2>

      <div className={styles.container}>
        <p className={styles.text}>
          {content}
        </p>
      </div>

    </section>
  );
}