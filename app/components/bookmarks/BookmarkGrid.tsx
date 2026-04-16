import styles from "@/app/(protected)/bookmarks/Bookmarks.module.css";
import BookmarkCard from "./BookmarkCard";

type Props = {
  agents: any[];
};

export default function BookmarkGrid({ agents }: Props) {

  return (
    <div className={styles.grid}>

      {agents.map((agent: any, index: number) => (
        <BookmarkCard key={index} agent={agent?.agent} />
      ))}

    </div>
  );

}