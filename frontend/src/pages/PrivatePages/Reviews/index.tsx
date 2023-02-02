import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Review } from "types/reviews";
import { hasAnyRoles, requestBackend } from "util/requests";
import { useParams } from "react-router-dom";
import "./styles.css";
import ReviewForm from "components/ReviewForm";
import ReviewCard from "components/ReviewCard";

type UrlParams = {
  movieId: string;
};

const Reviews = () => {
  const [page, setPage] = useState<Review[]>([]); //recebe a lista de reviews obtida na requisição.
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

  const handleInsertReview = (review: Review) => {
    const clone = [...page];
    clone.push(review);
    setPage(clone);
  };

  return (
    <div className="page-container">
      <h1>Tela de listagem de filmes id: {movieId}</h1>
      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}
      <div style={{backgroundColor: "#6C6C6C", paddingBottom: "28px", paddingTop: "5px", borderRadius: "4px"}}>
      {page?.map((x) => (
        <ReviewCard key={x.id} review={x} /> //uso a lista de reviews para renderizar card a card.
      ))}
      </div>
    </div>
  );
};

export default Reviews;
