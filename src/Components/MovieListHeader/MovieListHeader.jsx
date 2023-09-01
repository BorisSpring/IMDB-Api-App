import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import useStyles from "./styles";

const MovieListHeader = ({ movie }) => {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box className={classes.cardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie?.title}
          title={movie?.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" color={"white"}>
            {movie?.title}
          </Typography>
          <Typography variant="body1" color="white">
            {movie?.overview}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieListHeader;
