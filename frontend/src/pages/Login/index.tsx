import { ReactComponent as BannerImage } from "assets/images/banner.svg";
import { useForm } from "react-hook-form";
import { getAuthData, requestBackendLogin, saveAuthData } from "util/requests";
import "assets/styles/custom.css";
import "./styles.css";
import { useState } from "react";

// Um tipo que representa os dados do formulário:
type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [hasError, setHasError] = useState(false);

  // useForm parametrizado com FormData
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>();
  // recebe um argumento formData do tipo FormData
  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        const token = getAuthData().access_token;
        console.log("TOKEN GERADO: " + token);
        setHasError(false);
        console.log("SUCESSO!", response);
      })
      .catch((error) => {
        setHasError(true);
        console.log("Erro: ", error);
      });
  };

  return (
    <div className="login-container">
      <div className="banner-container">
        <h1>Avalie Filmes</h1>
        <h2>Diga o que você achou do seu filme favorito</h2>
        <BannerImage />
      </div>
      <div className="login-card">
        <h1>LOGIN</h1>
        {hasError && (
          <div className="danger">Erro ao tentar efetuar o login</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-login-container-email">
            <input
              {...register("username", {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              type="text"
              placeholder="Email"
              name="username"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="input-login-container-password">
            <input
              {...register("password", {
                required: 'Campo obrigatório'
              })}
              type="password"
              placeholder="Senha"
              name="password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="login-submit">
            <button>
              <h2>FAZER LOGIN</h2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
