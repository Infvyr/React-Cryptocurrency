import { Card } from 'antd';
import { NewsCardImage, NewsCardDescription, NewsCardMeta } from '../..';

const NewsCard = ({ news }) => {
	return (
		<Card hoverable className="news-card">
			<a href={news.url} target="_blank" rel="noreferrer">
				<NewsCardImage data={news} />
				<NewsCardDescription data={news} />
				<NewsCardMeta data={news} />
			</a>
		</Card>
	);
};

export default NewsCard;
