import styles from "./styles/Terms.module.css";

export default function TermsContent({
  content,
}: {
  content: string;
}) {

  const renderDraftContent = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const entityMap = parsed?.entityMap || {};

      return parsed?.blocks?.map((block: any, i: number) => {
        let text = block.text;

        if (block.inlineStyleRanges?.length) {
          block.inlineStyleRanges.forEach((range: any) => {
            if (range.style === "BOLD") {
              const before = text.slice(0, range.offset);
              const boldPart = text.slice(
                range.offset,
                range.offset + range.length
              );
              const after = text.slice(range.offset + range.length);

              text = `${before}<strong>${boldPart}</strong>${after}`;
            }
          });
        }

        if (block.entityRanges?.length) {
          block.entityRanges.forEach((range: any) => {
            const entity = entityMap[range.key];

            if (entity?.type === "LINK") {
              const url = entity?.data?.url || "#";

              const before = text.slice(0, range.offset);
              const linkText = text.slice(
                range.offset,
                range.offset + range.length
              );
              const after = text.slice(range.offset + range.length);

              text = `${before}<a href="${url}" target="_blank" rel="noopener noreferrer" class="${styles.linkText}">${linkText}</a>${after}`;
            }
          });
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
        );
      });
    } catch {
      return <p>{raw}</p>;
    }
  };

  return (
    <section className={styles.wrapper}>

      <div className={styles.contentContainer}>
        {renderDraftContent(content)}
      </div>

    </section>
  );
}