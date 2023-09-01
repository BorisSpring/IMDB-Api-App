import React from "react";
import useStyles from "./styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
const FeaturedShow = ({ show }) => {
  const classes = useStyles();
  console.log("show", show);
  return (
    <Card className={classes.card} classes={{ class: classes.cardRoot }}>
      <CardMedia
        media="picture"
        title={show?.name}
        image={`https://image.tmdb.org/t/p/original/${show?.poster_path}`}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" gutterBottom color={"white"}>
          {show?.name}
        </Typography>
        <Typography variant="h6" gutterBottom color={"white"}>
          {show?.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeaturedShow;
