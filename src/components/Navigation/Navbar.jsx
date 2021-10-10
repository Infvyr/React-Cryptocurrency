import { useState, useEffect } from 'react';
import { Button, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined,
	MoneyCollectOutlined,
	FundOutlined,
	MenuOutlined,
	ReadOutlined,
	CloseOutlined,
} from '@ant-design/icons';

import { Navigation } from '../';

import icon from '../../images/cryptocurrency.svg';

const Navbar = () => {
	const menuItems = [
		{ id: 1, icon: <HomeOutlined />, url: '/', title: 'Home' },
		{
			id: 2,
			icon: <FundOutlined />,
			url: '/cryptocurrencies',
			title: 'Cryptocurrencies',
		},
		{
			id: 3,
			icon: <MoneyCollectOutlined />,
			url: '/exchanges',
			title: 'Exchanges',
		},
		{ id: 4, icon: <ReadOutlined />, url: '/news', title: 'News' },
	];

	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(undefined);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (screenSize < 992) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	function handleClick() {
		if (screenSize < 992) {
			setActiveMenu(prevState => !prevState);
		}
	}

	return (
		<>
			<header className="nav-container">
				<div className="logo-container">
					<Avatar src={icon} size="large" />
					<Typography.Title level={2} className="logo">
						<Link to="/" title="Crypto App">
							Crypto App
						</Link>
					</Typography.Title>
				</div>
				<Button
					ghost
					className="menu-control-container"
					onClick={() => setActiveMenu(!activeMenu)}>
					{!activeMenu ? <MenuOutlined /> : <CloseOutlined />}
				</Button>

				{activeMenu && (
					<Navigation items={menuItems} handleClick={handleClick} />
				)}
			</header>
		</>
	);
};

export default Navbar;
