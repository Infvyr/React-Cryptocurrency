import { Select } from "antd";

const { Option } = Select;

const CryptocurrenciesFilter = ({ handleFilterBy, handleOrderBy }) => {
  return (
    <>
      <Select
        style={{ width: 120, minHeight: 40 }}
        placeholder="Filter by"
        optionFilterProp="children"
        onChange={handleFilterBy}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="price">Price</Option>
        <Option value="market_cap">Market cap</Option>
        <Option value="daily_change">Daily change</Option>
      </Select>

      <Select
        style={{ width: 120, minHeight: 40 }}
        placeholder="Order by"
        optionFilterProp="children"
        onChange={handleOrderBy}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="asc">ASC</Option>
        <Option value="desc">DESC</Option>
      </Select>
    </>
  );
};

export default CryptocurrenciesFilter;
