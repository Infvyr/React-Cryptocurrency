import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  Typography,
  Row,
  Col,
  Avatar,
  Card,
  Skeleton,
  Breadcrumb,
  Button,
} from "antd";
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
  const [visible, setVisible] = useState(8);

  const handleSelectNews = value => {
    setNewsCategory(value);
  };

  const loadMore = () => {
    setTimeout(() => {
      setVisible(visible + 4);
    }, 1000);
  };

  if (!cryptoNews?.value) return <Skeleton active />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <>
            <Col>
              <Title level={1}>Crypto News</Title>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>News</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={24}>
              <Select
                className="select-news"
                placeholder="Select a category"
                optionFilterProp="children"
                showSearch
                onChange={handleSelectNews}
                filterOption={(inputValue, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0
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
          </>
        )}
        {cryptoNews.value.slice(0, visible).map((news, i) => (
          <Col xs={24} md={12} xxl={6} key={i}>
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
      {!simplified && (
        <Row align="center">
          {visible < cryptoNews?.value?.length && (
            <div style={{ margin: "2rem 0" }}>
              <Button onClick={loadMore}>Load more</Button>
            </div>
          )}
        </Row>
      )}
    </>
  );
};

export default News;
