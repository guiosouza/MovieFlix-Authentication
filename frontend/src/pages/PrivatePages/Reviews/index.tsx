import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ReviewPage } from "types/ReviewPage";
import { Review } from "types/reviews";
import { requestBackend } from "util/requests";
import "./styles.css";

const Reviews = () => {
  const [page, setPage] = useState<ReviewPage<Review>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/movies/1/reviews",
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="movie-list-container">
        <h2>Tela de listagem de filmes</h2>
        {page?.map((item) => (
          <h2>Análise do filme {item.text}</h2>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
