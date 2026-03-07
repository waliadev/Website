import draftToHtml from "draftjs-to-html";
import styles from "./styles/Privacy.module.css";

export default function PrivacyContent({
  content,
}: {
  content: string;
}) {

  const renderContent = (raw: string) => {
    if (!raw) return null;

    try {
      const html = draftToHtml(JSON.parse(raw));

      return (
        <div
          className={styles.legalContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      return (
        <div
          className={styles.legalContent}
          dangerouslySetInnerHTML={{ __html: raw }}
        />
      );
    }
  };

  return (
    <section className={styles.wrapper}>

      <div className={styles.contentContainer}>
        {renderContent(content)}
      </div>

    </section>
  );
}