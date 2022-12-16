import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <Link to="/">
      <div className="navbar-container">
        <h2>MovieFlix</h2>
      </div>
    </Link>
  );
};

export default Navbar;
