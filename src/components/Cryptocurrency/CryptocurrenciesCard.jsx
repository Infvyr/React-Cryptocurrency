import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Col } from 'antd';

const CryptocurrenciesCard = ({ currency }) => {
	return (
		<Col xs={24} sm={12} xl={6} xxl={8} className="crypto-card">
			<Link to={`/crypto/${currency.id}`}>
				<Card
					title={`${currency.rank}. ${currency.name}`}
					extra={
						<img
							className="crypto-image"
							src={currency.iconUrl}
							alt={currency.name}
						/>
					}
					hoverable>
					<p>Price: {millify(currency.price, { precision: 6 })}</p>
					<p>Market cap: {millify(currency.marketCap)}</p>
					<p>Daily change: {millify(currency.change)}%</p>
				</Card>
			</Link>
		</Col>
	);
};

export default CryptocurrenciesCard;
