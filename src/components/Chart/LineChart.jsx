import { Line } from "react-chartjs-2";
import { Col, Row } from "antd";
import { HeadingTitle } from "../";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const cointPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        cointPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(
            new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
        );
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: cointPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [{ ticks: { beginAtZero: true } }],
        },
    };

    return (
        <>
            <Row className="chart-header">
                <HeadingTitle
                    levelNumber={2}
                    cssClass="chart-title"
                    title={`${coinName} Price chart`}
                />

                <Col className="price-container">
                    {coinHistory?.data?.change && (
                        <HeadingTitle
                            levelNumber={5}
                            title={`${coinHistory?.data?.change}%`}
                            cssClass="price-change"
                        />
                    )}

                    <HeadingTitle
                        levelNumber={5}
                        title={`Current ${coinName} Price: $ ${currentPrice}`}
                        cssClass="current-price"
                    />
                </Col>
            </Row>
            <Line data={data} options={options}></Line>
        </>
    );
};

export default LineChart;
