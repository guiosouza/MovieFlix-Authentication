import { AuthContext } from "AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "util/history";
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from "util/requests";
import "./styles.css";

type AuthData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // para não executar a navegação do link:
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/");
  };

  return (
    <div className="navbar-container">
      <Link to="/movies">
        <h2>MovieFlix</h2>
      </Link>
      <div className="nav-logout">
        {authContextData.authenticated ? (
          <a href="#logout" onClick={handleLogoutClick}>
            <button>SAIR</button>
          </a>
        ) : (
          <a href="#logout"></a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
