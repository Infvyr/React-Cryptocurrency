import { Avatar, Card, Typography } from "antd";
import moment from "moment";
import demoImage from "../images/demo-image.jpeg";

const { Text, Title } = Typography;

const NewsCard = ({ news }) => {
  return (
    <Card hoverable className="news-card">
      <a href={news.url} target="_blank" rel="noreferrer">
        <div className="news-image-container">
          <Title className="news-title" level={4}>
            {news.name}
          </Title>
          <img
            src={news?.image?.thumbnail?.contentUrl || demoImage}
            alt={news.name}
          />
        </div>
        <p>
          {news.description > 100
            ? `${news.description.substring(0, 100)}`
            : news.description}
        </p>
        <div className="provider-container">
          <div className="provider-meta">
            <Avatar
              src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
              alt="news"
            />
            <Text className="provider-name">{news.provider[0]?.name}</Text>
            <Text italic={true} type="secondary">
              {moment(news.datePublished).startOf("ss").fromNow()}
            </Text>
          </div>
        </div>
      </a>
    </Card>
  );
};

export default NewsCard;
