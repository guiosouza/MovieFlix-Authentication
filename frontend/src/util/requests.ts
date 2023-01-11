import qs from "qs";
import axios, { AxiosRequestConfig } from "axios";
import history from "./history";
import jwtDecode from 'jwt-decode';

// Estrutura da resposta do Login (ver no Postman ou Insomnia):
type LoginResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  userName: string;
  userId: number;
};

type Role = "ROLE_MEMBER" | "ROLE_VISITOR";

type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ??
  "https://movieflix-devsuperior.herokuapp.com";

const tokenKey = "authData";

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
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  // Será o corpo da requisição
  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer" + getAuthData().access_token,
      }
    : {};

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Função para permitir salvar o obj LoginResponse no localStorage:
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem("authData", JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? "{}";
  const obj = JSON.parse(str);
  return obj as LoginResponse;
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("Interceptor, antes da requisição");
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("Erro na requisição");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Interceptor, resposta com sucesso");
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 401 || error.response.status == 403) {
      history.push("/");
    }

    console.log("Interceptor, resposta com erro");
    return Promise.reject(error);
  }
);

// Pegar e decodificar o token
// Vamos usar uma biblioteca externa
// Função que retorna ou o TokenData ou undefined
export const getTokenData = () : TokenData | undefined => {

  const loginResponse = getAuthData();

  try {
    return jwtDecode(loginResponse.access_token) as TokenData;
  }
  catch(error) {
    return undefined;
  }
};

export const isAuthenticated = () : boolean => { 
  const tokenData = getTokenData();

  return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;

}
