import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { Link, useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Skeleton, Breadcrumb } from 'antd';
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';

import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import { HeadingTitle, LineChart } from '../components';

const { Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimeperiod] = useState('7d');
	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod,
	});

	const cryptoDetails = data?.data?.coin;

	if (isFetching) return <Skeleton active />;

	const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

	const stats = [
		{
			id: 1,
			title: 'Price to USD',
			value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			id: 2,
			title: 'Rank',
			value: cryptoDetails.rank,
			icon: <NumberOutlined />,
		},
		{
			id: 3,
			title: '24h Volume',
			value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
			icon: <ThunderboltOutlined />,
		},
		{
			id: 4,
			title: 'Market Cap',
			value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			id: 5,
			title: 'All-time-high(daily avg.)',
			value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats = [
		{
			id: 1,
			title: 'Number Of Markets',
			value: cryptoDetails.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			id: 2,
			title: 'Number Of Exchanges',
			value: cryptoDetails.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			id: 3,
			title: 'Aprroved Supply',
			value: cryptoDetails.approvedSupply ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />,
		},
		{
			id: 4,
			title: 'Total Supply',
			value: `$ ${millify(cryptoDetails.totalSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			id: 5,
			title: 'Circulating Supply',
			value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<Col className="coin-detail-container">
			<Col>
				<HeadingTitle
					levelNumber={1}
					title={cryptoDetails.name}
					cssClass="heading"
				/>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to="/">Home</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link to="/cryptocurrencies">Cryptocurrencies</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{cryptoDetails.name}</Breadcrumb.Item>
				</Breadcrumb>
			</Col>
			<Col className="coin-heading-container">
				<HeadingTitle
					levelNumber={2}
					title={`${cryptoDetails.name} (${cryptoDetails.slug}) Price`}
					cssClass="coin-name"
				/>
				<p>
					{cryptoDetails.name} live price in US Dollar (USD). View value
					statistics, market cap and supply.
				</p>
			</Col>
			<Select
				defaultValue="7d"
				className="select-timeperiod"
				placeholder="Select Timeperiod"
				onChange={value => setTimeperiod(value)}>
				{time.map(date => (
					<Option key={date}>{date}</Option>
				))}
			</Select>
			<LineChart
				coinHistory={coinHistory}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			<Col className="stats-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-statistics-heading">
						<HeadingTitle
							levelNumber={3}
							title={`${cryptoDetails.name} Value Statistics`}
							cssClass="coin-details-heading"
						/>
						<p>
							An overview showing the statistics of {cryptoDetails.name}, such
							as the base and quote currency, the rank, and trading volume.
						</p>
					</Col>
					{stats.map(({ id, icon, title, value }) => (
						<Col className="coin-stats" key={id}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
				<Col className="other-stats-info">
					<Col className="coin-value-statistics-heading">
						<HeadingTitle
							levelNumber={3}
							title="Other Stats Info"
							cssClass="coin-details-heading"
						/>
						<p>
							An overview showing the statistics of {cryptoDetails.name}, such
							as the base and quote currency, the rank, and trading volume.
						</p>
					</Col>
					{genericStats.map(({ id, icon, title, value }) => (
						<Col className="coin-stats" key={id}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<HeadingTitle
						levelNumber={3}
						title={`What is ${cryptoDetails.name}?`}
						cssClass="coin-details-heading"
					/>
					{HTMLReactParser(cryptoDetails.description)}
				</Row>
				<Col className="coin-links">
					<HeadingTitle
						levelNumber={3}
						title={`${cryptoDetails.name} Links`}
						cssClass="coin-details-heading"
					/>
					{cryptoDetails.links?.map(link => (
						<Row className="coin-link" key={link.name}>
							<HeadingTitle
								levelNumber={5}
								title={`${link.type}`}
								cssClass="link-name"
							/>
							<a href={link.url} target="_blank" rel="noreferrer">
								{link.name}
							</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
