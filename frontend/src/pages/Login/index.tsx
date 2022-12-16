import "./styles.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LOGIN</h1>
        <div className="input-login-container-email">
          <input type="text" placeholder="Email" />
        </div>
        <div className="input-login-container-password">
          <input type="text" placeholder="Senha" />
        </div>
        <button>FAZER LOGIN</button>
        <form action=""></form>
      </div>
    </div>
  );
};

export default Login;
