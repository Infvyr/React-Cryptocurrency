import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import {
  Breadcrumb,
  Col,
  Row,
  Typography,
  Table,
  Skeleton,
  Card,
  Statistic,
} from "antd";
import { useGetExchangesQuery } from "../services/cryptoExchanges";

const columns = [
  {
    title: "Exchanges",
    dataIndex: "name",
    // key: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "24h Trade Volume",
    dataIndex: "volume",
    // key: "volume",
    sorter: {
      compare: (a, b) => a.volume - b.volume,
    },
  },
  {
    title: "Markets",
    dataIndex: "numberOfMarkets",
    // key: "numberOfMarkets",
    sorter: {
      compare: (a, b) => a.numberOfMarkets - b.numberOfMarkets,
    },
  },
  {
    title: "Change",
    dataIndex: "marketShare",
    // key: "marketShare",
    sorter: {
      compare: (a, b) => a.marketShare - b.marketShare,
    },
  },
];

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const EXCHANGES = data?.data?.exchanges;
  const STATS = data?.data?.stats;
  const [exchanges, setExchanges] = useState([]);
  const [stats, setStats] = useState([]);

  const tableData = [];
  for (let i = 0; i < data?.data?.exchanges.length; i++) {
    tableData.push({
      key: data?.data?.exchanges[i].id,
      name: data?.data?.exchanges[i].name,
      volume: millify(data?.data?.exchanges[i].volume),
      numberOfMarkets: millify(data?.data?.exchanges[i].numberOfMarkets),
      marketShare: millify(data?.data?.exchanges[i].marketShare),
      description: data?.data?.exchanges[i].description,
    });
  }

  useEffect(() => {
    setExchanges(EXCHANGES);
    setStats(STATS);
  }, [EXCHANGES, STATS]);

  if (isFetching) return <Skeleton active />;

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={1}>Exchanges</Typography.Title>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Exchanges</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Exchanges stats</Typography.Title>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Volume"
              value={millify(STATS.volume, { precision: 2 })}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Total Number" value={millify(STATS.total)} />
          </Card>
        </Col>
      </Row>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => HTMLReactParser(record.description),
        }}
        expandRowByClick={true}
        dataSource={tableData}
      />
    </>
  );
};

export default Exchanges;
