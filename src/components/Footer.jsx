import { Link } from "react-router-dom";
import { Space, Typography } from "antd";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography.Title
        level={5}
        style={{ color: "#fff", textAlign: "center" }}
      >
        Crypto App - {new Date().getFullYear()}
      </Typography.Title>
      <Typography.Text style={{ color: "#fefefe" }}>
        &copy; All rights reserved
      </Typography.Text>
      <Space size="large" style={{ marginTop: ".5rem" }}>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </footer>
  );
};

export default Footer;
