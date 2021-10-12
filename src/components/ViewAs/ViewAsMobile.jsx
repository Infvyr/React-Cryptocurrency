import { useContext } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Col, Space } from 'antd';
import { ViewAsContext } from '../../app/context/viewAsContext';

const ViewAsMobile = () => {
	const { view, setView } = useContext(ViewAsContext);

	return (
		<Col span={4} xs={24} md={4}>
			<Space size="small" className="view-as">
				<span className="view-as-mob-label">View as:</span>
				<Button
					onClick={() => setView('list')}
					data-list={view === 'list' ? 'list' : null}>
					<MenuOutlined />
				</Button>
				<Button
					onClick={() => setView('grid')}
					data-list={view === 'grid' ? 'grid' : null}>
					<AppstoreOutlined />
				</Button>
			</Space>
			<div style={{ height: '15px' }} />
		</Col>
	);
};

export default ViewAsMobile;
