import { Select } from "antd";

const { Option } = Select;

const CryptocurrenciesFilter = ({
  handleFilterBy,
  handleOrderBy,
  isFilterBySelected,
}) => {
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
        <Option value="marketCap">Market cap</Option>
        <Option value="change">Daily change</Option>
      </Select>

      <Select
        style={{ width: 120, minHeight: 40 }}
        placeholder="Order by"
        optionFilterProp="children"
        onChange={handleOrderBy}
        disabled={!isFilterBySelected}
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
