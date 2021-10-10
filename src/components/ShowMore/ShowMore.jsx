import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const ShowMore = ({ title, url }) => {
	return (
		<Typography.Title level={3} className="show-more">
			<Link to={url}>
				<Button type="link" size="large" icon={<LinkOutlined />}>
					{title}
				</Button>
			</Link>
		</Typography.Title>
	);
};

export default ShowMore;
