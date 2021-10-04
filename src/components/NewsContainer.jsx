import { Col } from "antd";

import { NewsCard } from "../components";

const NewsContainer = ({ data, visible }) => {
  return (
    <>
      {data.slice(0, visible).map((news, i) => (
        <Col xs={24} md={12} xxl={6} key={i}>
          <NewsCard news={news} />
        </Col>
      ))}
    </>
  );
};

export default NewsContainer;
