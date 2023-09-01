import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const KEY = "ba8d8fb0137039a87f287ba7de3f4dd3";
export const BASE_URL = "https://api.themoviedb.org/3/";

export const tmdbApi = createApi({
  reducerPath: "tmdApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en&api_key=${KEY}`,
    }),
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${1}&api_key=${KEY}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${1}&api_key=${KEY}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${1}&api_key=${KEY}`;
        }
        return `/movie/popular?page=${1}&api_key=${KEY}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?api_key=${KEY}&append_to_response=videos,credits`,
    }),
    getRecommendations: builder.query({
      query: ({ id, page }) =>
        `movie/${id}/recommendations?language=en-US&page=${page}&api_key=${KEY}`,
    }),
    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${KEY}`,
    }),
    getActorsMovies: builder.query({
      query: ({ id, page }) =>
        `discover/movie?with_cast=${id}&page=${page}&api_key=${KEY}`,
    }),
    getFavoriteMovies: builder.query({
      query: ({ page, listName }) =>
        `/account/${localStorage.getItem(
          "account_id"
        )}/${listName}?api_key=${KEY}&page=${page}&session_id=${localStorage.getItem(
          "session_id"
        )}`,
    }),
    getTvShow: builder.query({
      query: (searchQuery) => {
        if (searchQuery === "popular") {
          return `/tv/popular?page=1&api_key=${KEY}`;
        }
        if (searchQuery === "airing_today") {
          return `/tv/airing_today?page=1&api_key=${KEY}`;
        }
        if (searchQuery === "on_the_air") {
          return `/tv/airing_today?page=1&api_key=${KEY}`;
        }
        if (searchQuery === "top_rated")
          return `/tv/on_the_air?page=1&api_key=${KEY}`;

        return `/tv/popular?page=1&api_key=${KEY}`;
      },
    }),
    getTvShowById: builder.query({
      query: (id) => `tv/${id}?api_key=${KEY}&append_to_response=videos,images`,
    }),
    getSeassonDetails: builder.query({
      query: ({ showNumber, seasson }) =>
        `tv/${showNumber}/season/${seasson}?api_key=${KEY}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorsMoviesQuery,
  useGetFavoriteMoviesQuery,
  useGetMovieStatusQuery,
  useGetTvShowQuery,
  useGetTvShowByIdQuery,
  useGetSeassonDetailsQuery,
} = tmdbApi;
