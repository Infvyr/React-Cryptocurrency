import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';

const CryptoStats = ({ stats }) => {
	return (
		<>
			<Typography.Title level={1} className="heading">
				Global Crypto Stats
			</Typography.Title>
			<Row className="crypto-stats-row">
				<Col span={8}>
					<Card>
						<Statistic title="Total Cryptocurrencies" value={stats.total} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Exchanges"
							value={millify(stats.totalExchanges)}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Market Cap"
							value={millify(stats.totalMarketCap)}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Statistic
							title="Total 24h Volume"
							value={millify(stats.total24hVolume)}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Statistic
							title="Total Markets"
							value={millify(stats.totalMarkets)}
						/>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CryptoStats;
