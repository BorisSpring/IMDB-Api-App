import { Grid, Rating, Typography, Box, Grow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const TvShow = ({ tvShow, index }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4} xl={2}>
      <Grow in timeout={(index + 1) * 250}>
        <Link to={`/tvShow/${tvShow.id}`} className={classes.link}>
          <img
            src={`https://image.tmdb.org/t/p/original/${tvShow?.poster_path}`}
            alt={tvShow?.name}
            className={classes.showImage}
          />
          <Typography variant="h5" align="center" className={classes.showTitle}>
            {tvShow?.name}
          </Typography>
          <Box className={classes.rating}>
            <Rating readOnly precision={0.1} value={tvShow?.vote_average / 2} />
          </Box>
        </Link>
      </Grow>
    </Grid>
  );
};

export default TvShow;
