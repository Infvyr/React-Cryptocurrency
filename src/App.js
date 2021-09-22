import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar } from './components';
import {
	Homepage,
	Exchanges,
	Cryptocurrencies,
	CryptoDetails,
	News,
} from './pages';
import './App.css';

const App = () => {
	const routes = [
		{ id: 1, exact: true, path: '/', component: <Homepage /> },
		{ id: 2, exact: true, path: '/exchanges', component: <Exchanges /> },
		{
			id: 3,
			exact: true,
			path: '/cryptocurrencies',
			component: <Cryptocurrencies />,
		},
		{
			id: 4,
			exact: true,
			path: '/crypto/:coinId',
			component: <CryptoDetails />,
		},
		{ id: 5, exact: true, path: '/news', component: <News /> },
	];

	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Switch>
							{routes.map(route => (
								<Route exact={route.exact} path={route.path} key={route.id}>
									{route.component}
								</Route>
							))}
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: '#fff', textAlign: 'center' }}>
						Crypto App - {new Date().getFullYear()}
					</Typography.Title>
					<Typography.Text style={{ color: '#fefefe' }}>
						&copy; All rights reserved
					</Typography.Text>
					<Space size="large" style={{ marginTop: '.5rem' }}>
						<Link to="/">Home</Link>
						<Link to="/exchanges">Exchanges</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default App;
