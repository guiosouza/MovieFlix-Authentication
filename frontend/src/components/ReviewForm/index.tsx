import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Review } from "types/reviews"
import "./styles.css";
import { requestBackend } from "util/requests";

type FormData = {
  text: string;
  movieId: number;
};
  
  type Props = {
    movieId: string
    onInsertReview:  (review: Review) => void
  }

const ReviewForm = ({movieId, onInsertReview} : Props) => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
     // converte a string formData.movieId para number
     // isso serve para poder ser enviado pela requisição de POST
      formData.movieId = parseInt(movieId);

      const config : AxiosRequestConfig = {
        method: 'POST',
        url: '/reviews',
        data: formData,
        withCredentials: true,
      };

      requestBackend(config)
      .then(response => {
        console.log('A requisição foi salva!', response);
        setValue('text', '');
        onInsertReview(response.data);
      })
      .catch(error => {
        console.log('Erro ao salvar!', error);
      });
  };

  return (
    <div className="review-submit-card">
      <form onSubmit={handleSubmit(onSubmit)}>
      <input
           {...register("text", {
             required: 'Campo obrigatório,'
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
