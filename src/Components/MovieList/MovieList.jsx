import React from "react";
import useStyles from "./styles";
import { Grid } from "@mui/material";
import Movie from "../Movie/Movie";

const MovieList = ({ movies, numberOfMovies = 12 }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.results?.slice(0, numberOfMovies).map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </Grid>
  );
};

export default MovieList;
