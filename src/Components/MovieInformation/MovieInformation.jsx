import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  KEY,
  useGetFavoriteMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../tmdbService";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import {
  ArrowCircleLeft,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import genreImages from "../../assets/genres";
import MovieList from "../MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../store/currentGenreOrCategorySlice";
import axios from "axios";

const MovieInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data: recommendatedMovies, isFetching: isLoading } =
    useGetRecommendationsQuery({ id, page });
  const { data: movie, isFetching } = useGetMovieQuery(id);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const filteredMovies = {
    ...recommendatedMovies,
    results: recommendatedMovies?.results?.filter(
      (movie) => movie.poster_path !== null
    ),
  };
  const { data: favorite, isFetching: isFetchingFavorite } =
    useGetFavoriteMoviesQuery({
      page: 1,
      listName: "favorite/movies",
    });
  const { data: watchlist, isFetching: isFetchingWatchList } =
    useGetFavoriteMoviesQuery({ page: 1, listName: "watchlist/movies" });
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchlisted, setisWatchlisted] = useState(false);

  useEffect(() => {
    setIsFavorited(
      !!favorite?.results?.find((movieF) => movieF?.id === movie?.id)
    );
  }, [favorite?.results, movie?.id]);

  useEffect(() => {
    setisWatchlisted(
      !!watchlist?.results?.find((movieW) => movieW?.id === movie?.id)
    );
  }, [movie?.id, watchlist?.results]);

  const account_id = localStorage.getItem("account_id");
  const session_id = localStorage.getItem("session_id");

  async function handleFavorited() {
    if (account_id && session_id) {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${KEY}&session_id=${session_id}`,
        {
          media_type: "movie",
          media_id: id,
          favorite: !isFavorited,
        }
      );
      setIsFavorited((prev) => !prev);
    }
  }

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?api_key=${KEY}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isWatchlisted,
      }
    );

    setisWatchlisted((prev) => !prev);
  };

  if (isFetching || isLoading || isFetchingFavorite || isFetchingWatchList)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "calc(100vh - 70px)" }}
      >
        <CircularProgress size="4rem" />
      </Box>
    );
  return (
    <Grid container className={classes.spaceAroundContainer}>
      <Grid item xs={12} lg={4}>
        <img
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://www.fillmurray.com/200/300"
          }
          alt={movie?.title}
          className={classes.movieImage}
        />
      </Grid>
      <Grid item xs={12} lg={7} p="20px">
        <Typography
          gutterBottom
          color="textPrimary"
          align="center"
          variant="h4"
        >
          {" "}
          {movie?.title}{" "}
          {movie?.relase_date && movie?.release_date?.split("-")[0]}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          color="textSecondary"
        >
          {movie?.tagline}
        </Typography>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="space-around"
          style={{ marginBottom: "20px" }}
        >
          <Grid item className={classes.spaceAroundContainer}>
            <Box display="flex" alignItems="flex-start">
              <Tooltip title={`Movie rating ${movie?.vote_average}`}>
                <Rating
                  readOnly
                  value={movie?.vote_average / 2}
                  precision={0.1}
                />
              </Tooltip>
              <Typography variant="subtitle1" style={{ marginLeft: "10px" }}>
                {movie?.vote_average}/10
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {" "}
              {movie?.runtime} min /{" "}
              {movie?.release_date &&
                new Intl.DateTimeFormat("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                  .format(new Date(movie?.release_date))
                  .replace(",", " ")}{" "}
              / {movie?.spoken_languages?.[0]?.name}
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-around" flexWrap={"wrap"}>
          {movie?.genres?.map(({ id, name }) => (
            <Link
              to="/"
              className={classes.genreLink}
              key={id}
              onClick={() => dispatch(selectGenreOrCategory(id))}
            >
              <img
                src={genreImages[name.toLowerCase()]}
                alt={`Genre ${name}`}
                className={classes.genreImage}
              />
              <Typography variant="subtitle1" color="textPrimary">
                {name}
              </Typography>
            </Link>
          ))}
        </Box>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          {movie?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Top cast
        </Typography>
        <Grid item container spacing={2}>
          {movie &&
            movie?.credits?.cast?.slice(0, 6).map((character, index) => (
              <Grid item xs={4} md={2} key={index}>
                <Link
                  to={`/profile/${character.id}`}
                  className={classes.actorLink}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                    alt={`${character?.name}`}
                    className={classes.actorImage}
                  />
                  <Typography variant="subtitle1" color="textPrimary">
                    {character.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {character?.character.split("/")[0]}
                  </Typography>
                </Link>
              </Grid>
            ))}
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{ marginTop: "20px" }}
          flexWrap={"wrap"}
        >
          <ButtonGroup size="small">
            {movie?.homepage && (
              <Button
                variant="outlined"
                endIcon={<Language />}
                href={`${movie?.homepage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Button>
            )}
            <Button
              variant="outlined"
              href={`https://www.imdb.com/title/${movie?.imdb_id}`}
              rel="noopener noreferrer"
              target="_blank"
              endIcon={<MovieIcon />}
            >
              Imdb
            </Button>
            <Button
              varaint="outlined"
              endIcon={<Theaters />}
              onClick={() => setModalOpen((open) => !open)}
            >
              Trailer
            </Button>
          </ButtonGroup>
          <ButtonGroup size="small">
            <Button
              variant="outlined"
              endIcon={isFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
              onClick={handleFavorited}
            >
              {isFavorited ? "Unfavorite" : "Favorite"}
            </Button>
            <Button
              varaint="outlined"
              endIcon={isWatchlisted ? <Remove /> : <PlusOne />}
              onClick={addToWatchList}
            >
              Watchlist
            </Button>
            <Button
              varaitn="outlined"
              endIcon={<ArrowCircleLeft />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        width={"100%"}
        style={{ marginTop: "20px" }}
      >
        You might also like
      </Typography>
      {recommendatedMovies?.results?.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <Typography variant="h5">No movies found.</Typography>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        pageCount={Math.ceil(recommendatedMovies?.total_results / 20)}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen((open) => !open)}
        closeAfterTransition
        className={classes.modal}
      >
        <iframe
          src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
          autoPlay
          frameBorder="0"
          title="Movie video"
          className={classes.iframe}
          allow="autoPlay"
          allowFullScreen={true}
        />
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
