import CardStar from "assets/images/review-star.png";
import { Review } from "types/reviews";
import "./styles.css";
type Props = {
  review: Review;
};
const ReviewCard = ({ review }: Props) => {
  return (
    <div style={{}}>
      <div className="movie-list-container">
        <div className="review-card">
          <div className="review-details">
            <div>
              <div className="reviewer-name">
                <img src={CardStar} width="12.95" height="15.34" alt="star" />
                <h2>{review.user.name}</h2>
              </div>
              <div className="review-details-box">
                <h2>{review.text}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
