import { useContext } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Col, Space, Tooltip } from 'antd';

import { ViewAsContext } from '../../app/context/viewAsContext';

const ViewAs = () => {
	const { view, setView } = useContext(ViewAsContext);

	return (
		<Col span={4} xs={24} sm={6}>
			<Space size="small" className="view-as">
				<Tooltip placement="top" title="View as list">
					<Button
						onClick={() => setView('list')}
						data-list={view === 'list' ? 'list' : null}>
						<MenuOutlined />
					</Button>
				</Tooltip>
				<Tooltip placement="top" title="View as grid">
					<Button
						onClick={() => setView('grid')}
						data-list={view === 'grid' ? 'grid' : null}>
						<AppstoreOutlined />
					</Button>
				</Tooltip>
			</Space>
			<div style={{ height: '30px' }} />
		</Col>
	);
};

export default ViewAs;
