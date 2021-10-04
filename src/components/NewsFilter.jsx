import { Col, Space, Select } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Option } = Select;

const NewsFilter = ({ handleSelectNews, handleSortNews, handleOrderNews }) => {
  const { data } = useGetCryptosQuery(100);

  return (
    <Col span={24} className="news-filter-container">
      <Space size="small">
        <Select
          className="select-news"
          placeholder="Select a category"
          optionFilterProp="children"
          showSearch
          onChange={handleSelectNews}
          filterOption={(inputValue, option) =>
            option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
        >
          <Option value="Cryptocurrency">All</Option>
          {data?.data?.coins.map(coin => (
            <Option value={coin.name} key={coin.id}>
              {coin.name}
            </Option>
          ))}
        </Select>

        <Select
          style={{ width: 120 }}
          placeholder="Sort by"
          optionFilterProp="children"
          onChange={handleSortNews}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="relevance">Relevance</Option>
          <Option value="date">Date</Option>
        </Select>

        <Select
          style={{ width: 120 }}
          placeholder="Order by"
          optionFilterProp="children"
          onChange={handleOrderNews}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="default">Default</Option>
          <Option value="asc">ASC</Option>
          <Option value="desc">DESC</Option>
        </Select>
      </Space>
    </Col>
  );
};

export default NewsFilter;
