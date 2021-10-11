import { useContext } from "react";
import { Col, Row } from "antd";
import { NewsCard } from "..";
import { ViewAsContext } from "../../app/context/viewAsContext";

const NewsContainer = ({ data, visible }) => {
  const { view } = useContext(ViewAsContext);

  return (
    <Row
      gutter={[16, 16]}
      className={view === "list" ? "view-as-list" : null}
      data-list={view === "list" ? "list" : null}
    >
      {data.slice(0, visible).map((news, i) => (
        <Col
          xs={24}
          md={view === "grid" ? 12 : 24}
          xl={view === "grid" ? 12 : 24}
          xxl={view === "grid" ? 6 : 24}
          key={i}
        >
          <NewsCard news={news} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsContainer;
