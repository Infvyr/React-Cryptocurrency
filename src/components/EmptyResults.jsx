import { Col, Empty } from "antd";

const EmptyResults = () => {
  return (
    <Col xs={24}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Col>
  );
};

export default EmptyResults;
