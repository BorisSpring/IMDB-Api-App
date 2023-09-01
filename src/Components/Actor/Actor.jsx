import React, { useState } from "react";
import useStyles from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useGetActorQuery, useGetActorsMoviesQuery } from "../../tmdbService";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

const Actor = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data: actor, isFetching } = useGetActorQuery(id);
  const { data: actorMovies, isFetching: isLoadingMovies } =
    useGetActorsMoviesQuery({ id, page });

  let movies = {
    ...actorMovies,
    results: actorMovies?.results?.filter(
      (movie) => movie.poster_path !== null
    ),
  };

  if (isFetching || isLoadingMovies)
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
    <>
      <Grid container>
        <Grid item xs={12} lg={5} xl={4}>
          <img
            src={`https:/tmdb.org/t/p/w500/${actor?.profile_path}`}
            alt={`${actor.name}`}
            className={classes.actorImage}
          />
        </Grid>
        <Grid
          item
          container
          display="flex"
          direction="column"
          xs={12}
          lg={6}
          xl={5}
          justifyContent="center"
        >
          <Typography variant="h3" gutterBottom>
            {actor?.name}
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Born {new Date(actor?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1">{actor?.biography}</Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            sx={{ marginTop: "40px" }}
          >
            <Button
              variant="contained"
              target="_blank"
              size="large"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/name/${actor?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              varaint="outlined"
              startIcon={<ArrowLeft />}
              onClick={() => navigate(-1)}
              size="large"
            >
              BACK
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ marginTop: "30px" }}
        >
          Movies
        </Typography>
        <MovieList movies={movies} numberOfMovies={18} />
        <Pagination
          page={page}
          setPage={setPage}
          pageCount={Math.ceil(actorMovies.total_results / 20)}
        />
      </Box>
    </>
  );
};

export default Actor;
