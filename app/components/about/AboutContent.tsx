"use client";

import DOMPurify from "dompurify";
import styles from "@/app/components/about/styles/AboutContent.module.css";

interface InlineStyleRange {
  offset: number;
  length: number;
  style: string;
}

interface Block {
  text: string;
  type: string;
  inlineStyleRanges: InlineStyleRange[];
  data?: {
    "text-align"?: string;
  };
}

interface Props {
  content?: {
    blocks: Block[];
  };
}

export default function AboutContent({ content }: Props) {
  if (!content?.blocks) return null;

  // ✅ FIXED: Apply styles (reverse order)
  const applyStyles = (text: string, ranges: InlineStyleRange[]) => {
    let result = text;

    const sortedRanges = [...ranges].sort(
      (a, b) => b.offset - a.offset
    );

    sortedRanges.forEach((range) => {
      const { offset, length, style } = range;

      const before = result.slice(0, offset);
      const target = result.substr(offset, length);
      const after = result.slice(offset + length);

      let styledText = target;

      // ✅ Bold
      if (style === "BOLD") {
        styledText = `<strong>${target}</strong>`;
      }

      // ✅ Italic
      if (style === "ITALIC") {
        styledText = `<em>${target}</em>`;
      }

      // ✅ Underline
      if (style === "UNDERLINE") {
        styledText = `<u>${target}</u>`;
      }

      // ✅ Color FIX
      if (style.startsWith("color-rgb")) {
        const color = style.replace("color-", "");
        styledText = `<span style="color:${color}">${target}</span>`;
      }

      result = before + styledText + after;
    });

    return result;
  };

  // ✅ Convert blocks → HTML
  const generateHTML = () => {
    return content.blocks
      .map((block) => {
        const text = applyStyles(
          block.text,
          block.inlineStyleRanges || []
        );

        const align = block?.data?.["text-align"] || "left";

        switch (block.type) {
          case "header-one":
            return `<h1 style="text-align:center">${text}</h1>`;

          case "header-three":
            return `<h3 style="text-align:${align}">${text}</h3>`;

          case "unstyled":
            return `<p style="text-align:${align}">${text}</p>`;

          default:
            return "";
        }
      })
      .join("");
  };

  // ✅ Sanitize HTML
  const cleanHTML = DOMPurify.sanitize(generateHTML());

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </section>
  );
}