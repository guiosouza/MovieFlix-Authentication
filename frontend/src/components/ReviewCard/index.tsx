import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ReviewPage } from "types/ReviewPage";
import { Review } from "types/reviews";
import { requestBackend } from "util/requests";
import CardStar from "assets/images/review-star.png";
import { useParams } from "react-router-dom";
import "./styles.css";

type UrlParams = {
  movieId: string;
}

const ReviewCard = () => {

  const [page, setPage] = useState<ReviewPage<Review>>();

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

  return (
      <div className="movie-list-container">
        <div className="review-card">
          <div className="review-details">
            {page?.map((item, index) => (
              <div key={index}>
                <div className="reviewer-name">
                  <img src={CardStar} width="12.95" height="15.34" alt="star" />
                  <h2 key={item.user.name}>{item.user.name}</h2>
                </div>
                <div className="review-details-box">
                  <h2 key={item.id}>{item.text}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ReviewCard;
