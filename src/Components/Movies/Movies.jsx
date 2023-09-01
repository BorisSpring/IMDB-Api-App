import React from "react";
import { useGetMoviesQuery } from "../../tmdbService";
import MovieList from "../MovieList/MovieList";
import { useSelector } from "react-redux";
import { genreOrCategory as selector } from "../../Store/currentGenreOrCategorySlice";
import { Box, CircularProgress } from "@mui/material";
import MovieListHeader from "../MovieListHeader/MovieListHeader";

const Movies = () => {
  const { genreIdOrCategoryName, page, searchQuery } = useSelector(selector);
  const {
    data: movies,
    isFetching,
    error,
  } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  if (isFetching)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "calc(100vh - 70px)" }}
      >
        <CircularProgress size="4rem" />
      </Box>
    );
  return (
    <div>
      {movies?.results?.length > 0 && (
        <MovieListHeader movie={movies?.results?.[0]} />
      )}
      {error ? (
        <Box display="flex" alignItems="center" justifyContent={"center"}>
          There was error fetching movies.Please try again later!
        </Box>
      ) : (
        <MovieList
          movies={{
            ...movies,
            results: movies?.results?.filter(
              (movie) => movie?.id !== movies?.results[0]?.id
            ),
          }}
        />
      )}
    </div>
  );
};

export default Movies;
