import { ReactComponent as BannerImage } from "assets/images/banner.svg";
import { useForm } from "react-hook-form";
import { requestBackendLogin } from "util/requests";
import "./styles.css";

// Um tipo que representa os dados do formulário:
type FormData = {
  username: string;
  password: string;
}

const Login = () => {

  // useForm parametrizado com FormData
  const { register, handleSubmit } = useForm<FormData>();
  // recebe um argumento formData do tipo FormData
  const onSubmit = (formData : FormData) => {
    
    requestBackendLogin(formData)
    .then(response => {
      console.log("SUCESSO!", response)
    })
    .catch(error => {
      console.log("Erro: ", error)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-login-container-email">
            <input
              {...register("username")}
              type="text" 
              placeholder="Email" 
              name="username"
            />
          </div>
          <div className="input-login-container-password">
            <input
             {...register("password")}
              type="password" 
              placeholder="Senha" 
              name="password"
            />
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
