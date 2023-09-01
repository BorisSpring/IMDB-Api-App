import {
  Box,
  CircularProgress,
  Grow,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  genreOrCategory,
  selectSeasson,
} from "../../Store/currentGenreOrCategorySlice";
import { useGetSeassonDetailsQuery } from "../../tmdbService";
import SeassonEpisodes from "../SeassonEpisodes/SeassonEpisodes";
const Season = ({ seasonNumber, showNumber, details }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useSelector(genreOrCategory);
  const { data, isFetching } = useGetSeassonDetailsQuery({
    showNumber: showNumber,
    seasson: seasonNumber,
  });

  if (isFetching)
    return (
      <ListItem>
        <CircularProgress size="1rem" />
      </ListItem>
    );
  return (
    <Grow in timeout={(seasonNumber + 1) * 250}>
      <ListItem
        className={classes.seasson}
        onClick={() => {
          dispatch(selectSeasson(seasonNumber));
        }}
        style={{
          border: seasonNumber === params.seasson && "2px solid #adb5bd",
        }}
      >
        <Box width="100%" className={classes.seasson}>
          <Typography variant="h6">Seasson {seasonNumber}</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            marginLeft={"auto"}
          >
            <Typography variant="h6" width={127}>
              {" "}
              Episodes ({details?.episode_count})
            </Typography>
          </Box>
        </Box>
        {seasonNumber === params.seasson && (
          <List width="100%">
            {data?.episodes?.map((episode, index) => (
              <SeassonEpisodes episode={episode} key={index} />
            ))}
          </List>
        )}
      </ListItem>
    </Grow>
  );
};

export default Season;
