import moment from 'moment';
import { Typography } from 'antd';

const NewsCardMetaTime = ({ data }) => {
	return (
		<Typography.Text italic={true} type="secondary">
			{moment(data.datePublished).startOf('ss').fromNow()}
		</Typography.Text>
	);
};

export default NewsCardMetaTime;
