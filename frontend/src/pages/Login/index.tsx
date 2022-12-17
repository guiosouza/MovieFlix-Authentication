import { Link } from "react-router-dom";
import { ReactComponent as BannerImage } from "assets/images/banner.svg";
import "./styles.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="banner-container">
        <h1>Avalie Filmes</h1>
        <h2>Diga o que você achou do seu filme favorito</h2>
        <BannerImage />
      </div>
      <div className="login-card">
        <h1>LOGIN</h1>
        <form>
          <div className="input-login-container-email">
            <input type="text" placeholder="Email" />
          </div>
          <div className="input-login-container-password">
            <input type="text" placeholder="Senha" />
          </div>
          <div className="login-submit">
            <button>
              <Link to="/">
                <h2>FAZER LOGIN</h2>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
