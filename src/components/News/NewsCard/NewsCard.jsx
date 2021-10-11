import { useContext } from "react";
import { Card } from "antd";
import { NewsCardImage, NewsCardDescription, NewsCardMeta } from "../..";
import { ViewAsContext } from "../../../app/context/viewAsContext";

const NewsCard = ({ news }) => {
  const { view } = useContext(ViewAsContext);

  return (
    <Card hoverable className={view === "grid" ? "news-card" : null}>
      <a href={news.url} target="_blank" rel="noreferrer">
        <NewsCardImage data={news} />
        <NewsCardDescription data={news} />
        <NewsCardMeta data={news} />
      </a>
    </Card>
  );
};

export default NewsCard;
