import { Avatar } from 'antd';
import demoImage from '../../../images/demo-image.jpeg';

const NewsCardMetaAvatar = ({ data }) => {
	return (
		<Avatar
			src={data.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
			alt="news"
		/>
	);
};

export default NewsCardMetaAvatar;
