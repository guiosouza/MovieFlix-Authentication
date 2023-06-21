import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Review } from "types/reviews";
import { BASE_URL, hasAnyRoles, requestBackend } from "util/requests";
import { useParams } from "react-router-dom";
import "./styles.css";
import ReviewForm from "components/ReviewForm";
import ReviewCard from "components/ReviewCard";

type UrlParams = {
  movieId: string;
};

export type Movie = {
  id: number,
  title: string,
  subTitle: string,
  year: number,
  imgUrl: string,
  synopsis: string
};

const Reviews = () => {
  const [page, setPage] = useState<Review[]>([]); //recebe a lista de reviews obtida na requisição.
  const [movieInfo, setMovieInfo] = useState<Movie>();
  const { movieId } = useParams<UrlParams>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
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
  }, [movieId]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovieInfo(response.data);
      console.log(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...page];
    clone.push(review);
    setPage(clone);
  };

  return (
    <div className="page-container">
      <div className="movie-card-details-container">
        {movieInfo ? (
          <>
            <div className="image-container">
              <img src={movieInfo.imgUrl} alt="imagem do filme" />
            </div>
            <div className="card-bottom-container" >
              <div className="movie-card-details-info">
                <h2>{movieInfo.title}</h2>
                <p className="year">{movieInfo.year}</p>
                <p className="subtitle">{movieInfo.subTitle}</p>
              </div>
              <div className="synopsis">
                <p>{movieInfo.synopsis}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      {/* Resto do conteúdo */}

      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}
      <div className="reviews-container">
        {page?.map((x) => (
          <ReviewCard key={x.id} review={x} /> //uso a lista de reviews para renderizar card a card.
        ))}
      </div>
    </div>
  );
};

export default Reviews;
