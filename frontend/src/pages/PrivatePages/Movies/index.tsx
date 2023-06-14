import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import "./styles.css";
import { BASE_URL, requestBackend } from "util/requests";
import { Genres } from "types/genres";
import { Movie } from "types/movie";
import { Controller, useForm } from 'react-hook-form';
import Pagination from "components/Pagination";


const Movies = () => {

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  const [selectGenres, setSelectGenres] = useState<Genres[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);

  const handleChange = (data : {value: number, label: string}) => {
    const params: AxiosRequestConfig = {
      url: data == null || undefined ? `${BASE_URL}/movies` : `${BASE_URL}/movies?genreId=${data.value}&page=0&size=4&sort=title`,
      withCredentials: true
    };
    requestBackend(params).then((response) => {
      setMovies(response.data.content)
    }).catch((error) => {
      console.log(error)
    })
  };


  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/genres`,
      withCredentials: true
    };
    requestBackend(params).then((response) => {

      type DataItem = {
        id: number;
        name: string;
      }

      const transformedData: { value: number, label: string }[] = response.data.map((item: DataItem) => {
        return {
          value: item.id,
          label: item.name
        };
      });

      setSelectGenres(transformedData);
      console.log(response.data);
    })
  }, [])

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/movies`,
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
          <Controller
            control={control}
            name="genre"
            render={({ field }) => (
              <Select
                classNamePrefix="filter-search-select"
                options={selectGenres}
                isClearable={true}
                placeholder="Selecione..."
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  handleChange(selectedOption)
                }}
                value={field.value}
              />
            )}
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
        <Pagination />
      </div>
    </div>
  );
};

export default Movies;
