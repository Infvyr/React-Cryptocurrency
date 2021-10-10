import { Typography } from 'antd';

const HeadingTitle = ({ levelNumber, title, cssClass }) => {
	return (
		<Typography.Title level={levelNumber} className={cssClass}>
			{title}
		</Typography.Title>
	);
};

export default HeadingTitle;
