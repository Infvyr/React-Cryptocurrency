import { Switch, Route } from 'react-router-dom';
import { BackTop, Layout } from 'antd';

import { Navbar, Footer } from './components';
import {
	Homepage,
	Exchanges,
	Cryptocurrencies,
	CryptoDetails,
	News,
} from './pages';

import './App.css';
import { RocketOutlined } from '@ant-design/icons';

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
			</div>
			<Footer />

			<BackTop>
				<div className="back-top-wrapper">
					<RocketOutlined />
				</div>
			</BackTop>
		</div>
	);
};

export default App;
