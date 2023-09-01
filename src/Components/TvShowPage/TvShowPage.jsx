import React from "react";
import { useGetTvShowQuery } from "../../tmdbService";
import { useSelector } from "react-redux";
import { genreOrCategory } from "../../Store/currentGenreOrCategorySlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import TvShowList from "../TvShowList/TvShowList";
import FeaturedShow from "../FeaturedShow/FeaturedShow";
const TvShow = () => {
  const { searchTv } = useSelector(genreOrCategory);
  const { data: tvShow, isFetching } = useGetTvShowQuery(searchTv);

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
    <Box>
      <FeaturedShow show={tvShow?.results[0]} />
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ marginTop: "20px" }}
      >
        Tv Show
      </Typography>
      <TvShowList tvShows={tvShow} />
    </Box>
  );
};

export default TvShow;
