import React from "react";
import useStyles from "./styles";
import { Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, index }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4} sm={6} lg={3} xl={2}>
      <Grow in key={index} timeout={(index + 1) * 250}>
        <Link to={`/movie/${movie?.id}`} className={classes.movieLink}>
          <img
            src={
              movie?.poster_path
                ? `https://tmdb.org/t/p/w500/${movie?.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            alt={movie?.title}
            className={classes.movieImage}
          />
          <Typography
            variant="h5"
            className={classes.movieTitle}
            align="center"
          >
            {movie?.title}
          </Typography>
          <Tooltip title={`Movie rating ${movie?.vote_average}`}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Rating
                value={movie?.vote_average?.toFixed(2) / 2}
                readOnly
                precision={0.1}
              />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
