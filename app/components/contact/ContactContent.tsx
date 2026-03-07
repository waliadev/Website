import styles from "./styles/Contact.module.css";

export default function ContactContent({
  content,
}: {
  content: string;
}) {

  const parseDraftContent = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const entityMap = parsed?.entityMap || {};

      return parsed?.blocks?.map((block: any, i: number) => {
        let text = block.text;

        const ranges = [
          ...(block.inlineStyleRanges || []).map((r: any) => ({
            ...r,
            type: "STYLE",
          })),
          ...(block.entityRanges || []).map((r: any) => ({
            ...r,
            type: "ENTITY",
          })),
        ];

        ranges
          .sort((a: any, b: any) => b.offset - a.offset)
          .forEach((range: any) => {
            const before = text.slice(0, range.offset);
            const middle = text.slice(
              range.offset,
              range.offset + range.length
            );
            const after = text.slice(range.offset + range.length);

            if (range.type === "STYLE" && range.style === "BOLD") {
              text = `${before}<strong>${middle}</strong>${after}`;
            }

            if (range.type === "ENTITY") {
              const entity = entityMap[range.key];

              if (entity?.type === "LINK") {
                const url = entity?.data?.url || "#";

                text = `${before}<a href="${url}" target="_blank" rel="noopener noreferrer" class="emailLink">${middle}</a>${after}`;
              }
            }
          });

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
        {parseDraftContent(content)}
      </div>
    </section>
  );
}