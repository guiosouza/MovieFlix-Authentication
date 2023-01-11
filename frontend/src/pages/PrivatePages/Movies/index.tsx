import { Link } from "react-router-dom";
import "./styles.css";

const Movies = () => {
  return (
    <div className="movie-list-page">
      <div className="list-container">
        <h1>Tela de listagem de filmes</h1>
        <Link  to="/movies/1/reviews"> <h2>Acessar movies/1</h2></Link>
        <Link  to="/movies/2/reviews"> <h2>Acessar movies/2</h2></Link>
      </div>
    </div>
  );
};

export default Movies;