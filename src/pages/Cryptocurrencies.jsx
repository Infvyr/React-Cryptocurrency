import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Input, Skeleton, Breadcrumb, Typography } from "antd";

import {
  LoadMore,
  CryptocurrenciesFilter,
  CryptocurrenciesContainer,
} from "../components";

import { SearchOutlined } from "@ant-design/icons";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  // handle the filter dropdown by
  const handleFilterBy = value => {
    switch (value) {
      case "price":
        setCryptos([].concat(cryptos).filter(item => item.price));
        console.log("Filter By " + value);
        break;

      case "market_cap":
        setCryptos([].concat(cryptos).filter(item => item.marketCap));
        console.log("Filter By " + value);
        break;

      case "daily_change":
        setCryptos([].concat(cryptos).filter(item => item.change));
        console.log("Filter By " + value);
        break;

      default:
        setCryptos();
        console.log("Filter By" + value);
        break;
    }
  };

  // handle the filter dropdown by
  const handleOrderBy = value => {
    switch (value) {
      case "asc":
        setCryptos(
          [].concat(cryptos).sort((a, b) => (a.price > b.price ? 1 : -1))
        );
        console.log("Order By " + value);
        break;

      case "desc":
        setCryptos(
          [].concat(cryptos).sort((a, b) => (b.price < a.price ? -1 : 1))
        );
        console.log("Order By " + value);
        break;

      default:
        setCryptos(cryptos);
        break;
    }
  };

  if (isFetching) return <Skeleton active />;

  return (
    <>
      {!simplified && (
        <>
          <Col>
            <Typography.Title level={1} className="heading">
              Cryptocurrencies
            </Typography.Title>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Cryptocurrencies</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col className="cryptocurrency-filter">
            <div className="search-crypto">
              <Input
                type="search"
                placeholder="Search Cryptocurrency"
                size="large"
                prefix={<SearchOutlined />}
                allowClear
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <CryptocurrenciesFilter
              handleFilterBy={handleFilterBy}
              handleOrderBy={handleOrderBy}
            />
          </Col>
        </>
      )}
      <CryptocurrenciesContainer data={cryptos} visible={visible} />
      {!simplified && (
        <LoadMore visible={visible} data={cryptos} setVisible={setVisible} />
      )}
    </>
  );
};

export default Cryptocurrencies;
