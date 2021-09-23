import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Row, Typography } from 'antd';

const Exchanges = () => {
	return (
		<Row>
			<Col>
				<Typography.Title level={1}>Exchanges</Typography.Title>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to="/">Home</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Exchanges</Breadcrumb.Item>
				</Breadcrumb>
			</Col>
		</Row>
	);
};

export default Exchanges;
