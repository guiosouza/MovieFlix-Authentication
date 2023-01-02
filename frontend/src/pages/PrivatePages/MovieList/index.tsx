import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/axios";
import { requestBackend } from "util/requests";
import "./styles.css";

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies`,
      params: {
        page: 0,
        size: 2,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies`,
      withCredentials: true,
      params: {
        page: 0,
        size: 2,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="movie-list-container">
        <h1>Tela de listagem de filmes</h1>
        {page?.content.map((item) => (
          <h2>Acessar /movies/{item.id}</h2>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
