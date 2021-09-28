import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
	Typography,
	Row,
	Col,
	Avatar,
	Card,
	Skeleton,
	Breadcrumb,
	Button,
} from 'antd';
import moment from 'moment';
import Filter from '../components/Filter';

import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';

import demoImage from '../images/demo-image.jpeg';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Crytocurrency');
	const [sortBy, setSortBy] = useState('');
	const [orderedNews, setOrderedNews] = useState([]);

	const { data: cryptoNews = [] } = useGetCryptosNewsQuery({
		newsCategory,
		count: simplified ? 4 : 24,
		sortBy,
		orderedNews,
	});

	const [visible, setVisible] = useState(8);
	const [loading, setLoading] = useState(false);

	const handleSelectNews = value => {
		setNewsCategory(value);
	};

	const handleSortNews = value => {
		setSortBy(value);
	};

	const orderNews = useMemo(() => {
		// const orderedNews = cryptoNews.value.slice();
		// // sort news desc chronological order
		// orderedNews.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
		// return orderedNews;
		const arrCopy = [].concat(cryptoNews.value);
		arrCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
		return arrCopy;
	}, [cryptoNews.value]);

	const handleOrderNews = value => {
		const orderByAsc = []
			.concat(cryptoNews.value)
			.sort((a, b) => (a.name > b.name ? 1 : -1));

		const orderByDesc = []
			.concat(cryptoNews.value)
			.sort((a, b) => (b.name < a.name ? -1 : 1));

		switch (value) {
			case 'asc':
				setOrderedNews(orderByAsc);
				console.log(orderByAsc); // array
				break;
			// return orderByAsc;

			case 'desc':
				setOrderedNews(value);
				break;
			default:
				setOrderedNews('default');
				break;
		}
	};

	// console.log(cryptoNews.value);

	const loadMore = () => {
		setLoading(true);
		setTimeout(() => {
			setVisible(visible + 4);
			setLoading(false);
		}, 1000);
	};

	if (!cryptoNews?.value) return <Skeleton active />;

	return (
		<>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<>
						<Col>
							<Title level={1} className="heading">
								Crypto News
							</Title>
							<Breadcrumb>
								<Breadcrumb.Item>
									<Link to="/">Home</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item>News</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
						<Filter
							handleSelectNews={handleSelectNews}
							handleSortNews={handleSortNews}
							handleOrderNews={handleOrderNews}
						/>
					</>
				)}
				{orderNews.slice(0, visible).map((news, i) => (
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
											{moment(news.datePublished).startOf('ss').fromNow()}
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
						<div style={{ margin: '2rem 0' }}>
							<Button loading={loading} onClick={loadMore}>
								Load more
							</Button>
						</div>
					)}
				</Row>
			)}
		</>
	);
};

export default News;
