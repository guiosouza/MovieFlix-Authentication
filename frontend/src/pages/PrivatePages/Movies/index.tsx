import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import { BASE_URL, requestBackend } from "util/requests";
import { Genres } from "types/genres";
import { Movie } from "types/movie";
import { Controller, useForm } from 'react-hook-form';
import Pagination from "components/Pagination";
import "./styles.css";

const Movies = () => {

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const [selectGenres, setSelectGenres] = useState<Genres[]>([]);
  const [totalPages, setTotalPages] = useState();
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMoviesByPagination = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/movies?genreId=0&page=${pageNumber}&sort=title`,
      withCredentials: true,
      params: {
        size: 4
      }
    };
    requestBackend(params).then((response) => {
      setMovies(response.data.content)
      setTotalPages(response.data.totalPages);
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleChange = (data: { value: number, label: string }) => {
    const params: AxiosRequestConfig = {
      url: data == null || undefined ? `${BASE_URL}/movies?genreId=0&page=0&sort=title` : `${BASE_URL}/movies?genreId=${data.value}&page=0&sort=title`,
      withCredentials: true,
      params: {
        size: 4
      }
    };
    requestBackend(params).then((response) => {
      setMovies(response.data.content)
      setTotalPages(response.data.totalPages);
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  };


  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/genres`,
      withCredentials: true,
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
    })
  }, [])

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `${BASE_URL}/movies?genreId=0&page=0&sort=title`,
      withCredentials: true,
      params: {
        size: 4
      }
    };
    requestBackend(params).then((response) => {
      setTotalPages(response.data.totalPages);
      setMovies(response.data.content)

    })
  }, []);

  return (
    <div className="movie-list-page">
      <div className="container">
        <div className="filter-row">
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
        </div>
        <div className="card-row">
          {movies.map((movie) => (
            <div className="col-md-6">
              <Link to={`/movies/${movie.id}/reviews`} key={movie.id}>
                <div key={movie.id} className="movie-card">
                  <img src={movie.imgUrl} alt={movie.title} />
                  <div className="movie-card-info">
                    <h2>{movie.title}</h2>
                    <p className="year">{movie.year}</p>
                    <p className="subtitle">{movie.subTitle}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination-row">
          <Pagination pageCount={(totalPages) ? totalPages : 0}
            range={4}
            onChange={getMoviesByPagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
