import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Skeleton, Breadcrumb, Col } from 'antd';
import {
	HeadingTitle,
	NewsFilter,
	NewsContainer,
	LoadMore,
} from '../components';

import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';

const News = ({ simplified }) => {
	const [visible, setVisible] = useState(simplified ? 4 : 16);
	const [newsCategory, setNewsCategory] = useState('Crytocurrency');
	const [sortBy, setSortBy] = useState('');

	const { data: cryptoNews = [] } = useGetCryptosNewsQuery({
		newsCategory,
		count: simplified ? 4 : 24,
		sortBy,
	});
	const [orderedNews, setOrderedNews] = useState([]);

	useEffect(() => {
		if (cryptoNews?.value?.length) {
			setOrderedNews(cryptoNews.value);
		}
	}, [cryptoNews.value]);

	// handle category dropdown
	const handleSelectNews = value => {
		setNewsCategory(value);
	};

	// handle sort by dropdown
	const handleSortNews = value => {
		setSortBy(value);
	};

	// handle order by
	const memoizedDefaultOrder = useMemo(() => {
		return [].concat(cryptoNews.value);
	}, [cryptoNews.value]);

	const memoizedAscOrder = useMemo(() => {
		const orderByAsc = []
			.concat(cryptoNews.value)
			.sort((a, b) => (a.name > b.name ? 1 : -1));
		return orderByAsc;
	}, [cryptoNews.value]);

	const memoizedDescOrder = useMemo(() => {
		const orderByDesc = []
			.concat(cryptoNews.value)
			.sort((a, b) => (b.name < a.name ? -1 : 1));
		return orderByDesc;
	}, [cryptoNews.value]);

	const handleOrderNews = value => {
		switch (value) {
			case 'asc':
				setOrderedNews(memoizedAscOrder);
				break;

			case 'desc':
				setOrderedNews(memoizedDescOrder);
				break;

			default:
				setOrderedNews(memoizedDefaultOrder);
				break;
		}
	};

	if (!cryptoNews?.value) return <Skeleton active />;

	return (
		<>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<>
						<Col>
							<HeadingTitle
								levelNumber={1}
								title="Crypto News"
								cssClass="heading"
							/>
							<Breadcrumb>
								<Breadcrumb.Item>
									<Link to="/">Home</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item>News</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
						<NewsFilter
							handleSelectNews={handleSelectNews}
							handleSortNews={handleSortNews}
							handleOrderNews={handleOrderNews}
						/>
					</>
				)}
				<NewsContainer data={orderedNews} visible={visible} />
			</Row>
			{!simplified && (
				<LoadMore
					visible={visible}
					data={cryptoNews?.value}
					setVisible={setVisible}
					loadAmount={8}
				/>
			)}
		</>
	);
};

export default News;
