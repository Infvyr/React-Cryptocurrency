import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Skeleton } from "antd";
import moment from "moment";

import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import demoImage from "../images/demo-image.jpeg";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Crytocurrency");
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory,
    count: simplified ? 4 : 24,
  });
  const { data } = useGetCryptosQuery(100);

  const handleSelectNews = value => {
    setNewsCategory(value);
  };

  if (!cryptoNews?.value) return <Skeleton active />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            placeholder="Select a category"
            optionFilterProp="children"
            showSearch
            onChange={handleSelectNews}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">All</Option>
            {data?.data?.coins.map(coin => (
              <Option value={coin.name} key={coin.id}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={i}>
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
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                  <Text italic={true} type="secondary">
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;