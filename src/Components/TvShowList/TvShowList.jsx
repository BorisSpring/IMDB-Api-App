import { Grid } from "@mui/material";
import React from "react";
import TvShow from "../TvShow/TvShow";
import useStyles from "./styles";

const TvShowList = ({ tvShows }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {tvShows?.results?.map((tvShow, index) => (
        <TvShow tvShow={tvShow} index={index} key={index} />
      ))}
    </Grid>
  );
};

export default TvShowList;
