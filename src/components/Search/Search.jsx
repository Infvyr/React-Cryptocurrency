import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = ({ placeholder, size, cssClass, onChange }) => {
	return (
		<div className={cssClass}>
			<Input
				type="search"
				placeholder={placeholder}
				size={size}
				prefix={<SearchOutlined />}
				allowClear
				onChange={onChange}
			/>
		</div>
	);
};

export default Search;
