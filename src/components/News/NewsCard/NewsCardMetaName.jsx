import { Typography } from 'antd';

const NewsCardMetaName = ({ data }) => {
	return (
		<Typography.Text className="provider-name">
			{data.provider[0]?.name}
		</Typography.Text>
	);
};

export default NewsCardMetaName;
