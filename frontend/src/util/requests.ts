import qs from "qs";
import axios from "axios";

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ??
  "https://movieflix-devsuperior.herokuapp.com";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "myclientid";
const CLIENT_SECRET = process.env.REACT_APPCLIENT_SECRET ?? "myclientsecret";

// Vamos criar um type em vez de usar o type pronto dentro de "pages/Login"
// Isso porque as credenciais lá podem mudar, mas aqui serão sempre fixas
type LoginData = {
  username: string;
  password: string;
};

// Função para fazer requisição de Login
export const requestBackendLogin = (loginData: LoginData) => {
  // headers vem do AxiosRequestConfig
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  // Será o corpo da requisição
  const data = qs.stringify({
    ...loginData,
    grant_type: 'password'
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};
