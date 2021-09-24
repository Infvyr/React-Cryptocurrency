import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const Navigation = ({ type, items, setActiveMenu }) => {
  return (
    <nav className={type === "mobile-menu" ? "mobile-menu" : "desktop-menu"}>
      <Menu
        theme="dark"
        selectable={false}
        onClick={() => setActiveMenu(prevState => !prevState)}
      >
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
