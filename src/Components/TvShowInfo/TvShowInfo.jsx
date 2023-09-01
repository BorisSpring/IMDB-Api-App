import React, { useState } from "react";
import useStyles from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTvShowByIdQuery } from "../../tmdbService";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  List,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { ArrowBack, Language, Movie } from "@mui/icons-material";
import Season from "../Season/Season";

export const TvShowInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data: tvShow, isFetching } = useGetTvShowByIdQuery(id);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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
    <Grid container overflow={"hidden"}>
      <Grid item xs={12} md={5} lg={4} classes={classes.imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/original/${tvShow?.poster_path}`}
          alt={tvShow?.name}
          className={classes.showImage}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" align="center" gutterBottom>
          {tvShow?.name}
        </Typography>
        {tvShow?.overview && (
          <Typography variant="h5" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Description: </span>{" "}
            {tvShow?.overview}
          </Typography>
        )}
        <Box>
          <Typography gutterBottom variant="h6" color="textSecondary">
            First air date: {new Date(tvShow?.first_air_date).toDateString()}
          </Typography>
          {tvShow?.next_episode_to_air?.air_date && (
            <Typography gutterBottomvariant="h6" color="textSecondary">
              Next episode to air:{" "}
              {new Date(tvShow.next_episode_to_air.air_date).toDateString()}
            </Typography>
          )}
          {tvShow?.number_of_episodes && (
            <Typography gutterBottom variant="h6" color="textSecondary">
              Number of episodes: {tvShow.number_of_episodes}
            </Typography>
          )}
          {tvShow?.number_of_seasons && (
            <Typography gutterBottom variant="h6" color="textSecondary">
              Number of seasons: {tvShow?.number_of_seasons}
            </Typography>
          )}
          {tvShow?.spoken_languages[0] && (
            <Typography gutterBottom variant="h6" color="textSecondary">
              Spoken language: {tvShow?.spoken_languages[0].english_name}{" "}
            </Typography>
          )}
          {tvShow?.type && (
            <Typography gutterBottom variant="h6" color="textSecondary">
              Type: {tvShow?.type}{" "}
            </Typography>
          )}
        </Box>
        <Typography
          display="flex"
          alignItems="center"
          variant="h6"
          gutterBottom
        >
          AverageRating:{" "}
          <Rating readOnly precision={0.1} value={tvShow?.vote_average / 2} />{" "}
          {tvShow.vote_average.toFixed(2)}/10
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: "20px" }}
        >
          <ButtonGroup size="small">
            {tvShow?.homepage && (
              <Button
                variant="outlined"
                endIcon={<Language />}
                href={`${tvShow?.homepage}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </Button>
            )}
            {tvShow?.videos?.results?.length > 0 && (
              <Button
                endIcon={<Movie />}
                onClick={() => setModalOpen((prev) => !prev)}
              >
                Video
              </Button>
            )}
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "30px" }}>
        <Typography variant="h3">Seasons</Typography>
        <List>
          {Array.from({ length: tvShow?.number_of_seasons }, (_, index) => (
            <Season
              seasonNumber={index + 1}
              key={index}
              details={tvShow?.seasons[index]}
              showNumber={tvShow?.id}
            />
          ))}
        </List>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen((open) => !open)}
        className={classes.modal}
        closeAfterTransition
      >
        <iframe
          src={`https://www.youtube.com/embed/${tvShow?.videos?.results[0]?.key}`}
          title={`${tvShow?.name}`}
          allow="autoPlay"
          autoPlay
          className={classes.iFrame}
          allowFullScreen={true}
          frameBorder={0}
        />
      </Modal>
    </Grid>
  );
};
