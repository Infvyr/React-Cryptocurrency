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
        dataIndex: "icon",
        responsive: ["md"],
        render: theImageURL => <img src={theImageURL} alt={theImageURL} />,
    },
    {
        title: "Exchanges",
        dataIndex: "name",
        sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
        },
    },
    // {
    //   title: "24h Trade Volume",
    //   dataIndex: "volume",
    // },
    {
        title: "Markets",
        dataIndex: "numberOfMarkets",
        sorter: {
            compare: (a, b) => a.numberOfMarkets - b.numberOfMarkets,
        },
    },
    {
        title: "Change",
        dataIndex: "marketShare",
        sorter: {
            compare: (a, b) => a.marketShare - b.marketShare,
        },
        responsive: ["md"],
    },
];

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const EXCHANGES = data?.data?.exchanges;
    const STATS = data?.data?.stats;
    const [, setExchanges] = useState([]);
    const [, setStats] = useState([]);

    const tableData = [];
    for (let i = 0; i < data?.data?.exchanges.length; i++) {
        tableData.push({
            key: data?.data?.exchanges[i].uuid,
            icon: data?.data?.exchanges[i].iconUrl,
            name: data?.data?.exchanges[i].name,
            // volume: millify(data?.data?.exchanges[i].volume, { precision: 4 }),
            numberOfMarkets: data?.data?.exchanges[i].numberOfMarkets,
            marketShare: millify(data?.data?.exchanges[i].marketShare, {
                precision: 4,
            }),
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
                    <Typography.Title level={1} className="heading">
                        Exchanges
                    </Typography.Title>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Exchanges</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <div style={{ width: "100%", height: "20px" }} />
                <Col span={24}>
                    <Typography.Title level={3}>
                        Exchanges stats
                    </Typography.Title>
                </Col>
                {
                    // <Col span={12}>
                    //     <Card>
                    //         <Statistic
                    //             title="Total Volume"
                    //             value={millify(STATS.volume, { precision: 2 })}
                    //         />
                    //     </Card>
                    // </Col>
                }
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Total Number"
                            value={millify(STATS.total)}
                        />
                    </Card>
                </Col>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: ({ description }) => {
                            if (description !== null) {
                                return HTMLReactParser(description);
                            }
                        },
                    }}
                    expandRowByClick={true}
                    dataSource={tableData}
                    pagination={{ position: ["bottomLeft"] }}
                    className="exchange-table"
                />
            </Row>
        </>
    );
};

export default Exchanges;
