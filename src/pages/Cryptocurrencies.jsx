import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Skeleton, Breadcrumb } from 'antd';

import {
	HeadingTitle,
	Search,
	CryptocurrenciesFilter,
	CryptocurrenciesContainer,
	LoadMore,
} from '../components';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [visible, setVisible] = useState(simplified ? 10 : 12);
	const [isFilterBySelected, setIsFilterBySelected] = useState(false);
	const [filterVal, setFilterVal] = useState(undefined);

	const filterValuesArr = ['price', 'marketCap', 'change'];

	useEffect(() => {
		const filteredData = cryptoList?.data?.coins.filter(coin =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptoList, searchTerm]);

	// handle search
	const handleSearch = e => setSearchTerm(e.target.value);

	// handle the filter dropdown by
	const handleFilterBy = value => {
		switch (value) {
			case 'price':
			case 'marketCap':
			case 'change':
				setIsFilterBySelected(true);
				setFilterVal(value);
				break;

			default:
				setIsFilterBySelected(false);
				setFilterVal('price');
				break;
		}
	};

	// handle the filter dropdown by
	const handleOrderBy = value => {
		switch (value) {
			case 'asc':
				filterValuesArr.forEach(val => {
					if (filterVal === val) {
						setCryptos(
							[].concat(cryptos).sort((a, b) => {
								return parseFloat(a.val) > parseFloat(b.val) ? 1 : -1;
							})
						);
					}
				});
				break;

			case 'desc':
				filterValuesArr.forEach(val => {
					if (filterVal === val) {
						setCryptos(
							[].concat(cryptos).sort((a, b) => {
								return parseFloat(a.val) > parseFloat(b.val) ? 1 : -1;
							})
						);
					}
				});
				break;

			default:
				setCryptos([].concat(cryptos));
				break;
		}
	};

	if (isFetching) return <Skeleton active />;

	return (
		<>
			{!simplified && (
				<>
					<Col>
						<HeadingTitle
							levelNumber={1}
							title="Cryptocurrencies"
							cssClass="heading"
						/>
						<Breadcrumb>
							<Breadcrumb.Item>
								<Link to="/">Home</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Cryptocurrencies</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col className="cryptocurrency-filter">
						<Search
							placeholder="Search Cryptocurrency"
							size="large"
							cssClass="search-crypto"
							onChange={handleSearch}
						/>
						<CryptocurrenciesFilter
							handleFilterBy={handleFilterBy}
							handleOrderBy={handleOrderBy}
							isFilterBySelected={isFilterBySelected}
						/>
					</Col>
				</>
			)}

			<CryptocurrenciesContainer
				data={cryptos}
				visible={visible}
				filterBy={filterVal}
			/>

			{!simplified && (
				<LoadMore
					visible={visible}
					data={cryptos}
					setVisible={setVisible}
					loadAmount={6}
				/>
			)}
		</>
	);
};

export default Cryptocurrencies;
