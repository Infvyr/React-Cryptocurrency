import { useState } from 'react';
import { Button, Row } from 'antd';

const LoadMore = ({ visible, data, setVisible, loadAmount }) => {
	const [loading, setLoading] = useState(false);

	const handleLoadMore = () => {
		setLoading(true);
		setTimeout(() => {
			setVisible(visible + loadAmount);
			setLoading(false);
		}, 1000);
	};

	return (
		<Row align="center">
			{visible < data?.length && (
				<div style={{ margin: '2rem 0' }}>
					<Button loading={loading} onClick={handleLoadMore}>
						Load more
					</Button>
				</div>
			)}
		</Row>
	);
};

export default LoadMore;
