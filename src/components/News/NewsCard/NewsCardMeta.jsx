import { NewsCardMetaAvatar, NewsCardMetaName, NewsCardMetaTime } from '../..';

const NewsCardMeta = ({ data }) => {
	return (
		<div className="provider-meta">
			<NewsCardMetaAvatar data={data} />
			<NewsCardMetaName data={data} />
			<NewsCardMetaTime data={data} />
		</div>
	);
};

export default NewsCardMeta;
