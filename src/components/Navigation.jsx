import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const Navigation = ({ items, handleClick }) => {
  return (
    <nav className="app-menu">
      <Menu theme="dark" selectable={false} onClick={handleClick}>
        {items.map(item => (
          <Menu.Item icon={item.icon} key={item.id}>
            <NavLink to={item.url} activeClassName="active" exact>
              {item.title}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default Navigation;
