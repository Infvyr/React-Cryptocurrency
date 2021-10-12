import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Col } from 'antd';

const CryptocurrenciesCard = ({ currency, filterBy }) => {
	return (
		<Col xs={24} sm={12} xl={6} xxl={8} className="crypto-card">
			<Link to={`/cryptocurrencies/${currency.id}`}>
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
					<p className={filterBy === 'price' ? 'selected' : null}>
						Price: {millify(currency.price, { precision: 6 })}
					</p>
					<p className={filterBy === 'marketCap' ? 'selected' : null}>
						Market cap: {millify(currency.marketCap)}
					</p>
					<p className={filterBy === 'change' ? 'selected' : null}>
						Daily change: {millify(currency.change)}%
					</p>
				</Card>
			</Link>
		</Col>
	);
};

export default CryptocurrenciesCard;
