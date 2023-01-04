import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/axios";
import { requestBackend } from "util/requests";
import "./styles.css";

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/movies",
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
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
          <h2 key={item.id}>Acessar movies/{item.id}</h2>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
