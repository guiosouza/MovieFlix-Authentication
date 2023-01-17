import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ReviewPage } from "types/ReviewPage";
import { Review } from "types/reviews";
import { useForm } from "react-hook-form";
import "./styles.css";

type FormData = {
  text: string;
  movieId: number;
};
  
  type Props = {
    movieId: string
  }

const ReviewForm = ({movieId} : Props) => {
  const [page, setPage] = useState<ReviewPage<Review>>();

  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
      
  };

  return (
    <div className="review-submit-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
            {...register("text", {
            })}
          id="input-review"
          type="text"
          placeholder="Deixe sua avaliação aqui"
          name="text"
        />
        <button>SALVAR AVALIAÇÃO</button>
      </form>
    </div>
  );
};

export default ReviewForm;
