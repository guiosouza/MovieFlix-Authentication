import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import "./styles.css";
import { BASE_URL, requestBackend } from "util/requests";

type Movie = {
  id: number;
  title: string;
  subTitle: string | null;
  year: number;
  imgUrl: string;
};

const Movies = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {

    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/movies?genreId=0&page=0&size=4&sort=title`,
      withCredentials: true
    };
    requestBackend(params).then((response) => {
      setMovies(response.data.content)
      console.log(movies)
    })
  }, []);

  return (
    <div className="movie-list-page">
      <div className="list-container">
        <div className="filter-search">
          <Select 
          classNamePrefix="filter-search-select"
          options={options}
          isClearable={true}
          placeholder="Selecione..."
          />

        </div>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.imgUrl} alt={movie.title} />
            <div className="movie-card-info">
              <h2>{movie.title}</h2>
              <p className="year">{movie.year}</p>
              <p className="subtitle">{movie.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
