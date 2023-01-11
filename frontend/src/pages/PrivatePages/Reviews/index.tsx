import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ReviewPage } from "types/ReviewPage";
import { Review } from "types/reviews";
import { requestBackend } from "util/requests";
import CardStar from "assets/images/review-star.png";
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
        <h1>Tela de listagem de filmes id: 1</h1>
        <div className="review-card">
          <div className="review-details">
            {page?.map((item) => (
              <>
                <div className="reviewer-name">
                  <img                    
                    src={CardStar}
                    width="12.95"
                    height="15.34"
                    alt="star"
                  />
                  <h2 key={item.user.name} >{item.user.name}</h2>
                </div>
                <div className="review-details-box">
                  <h2 key={item.id} >{item.text}</h2>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
