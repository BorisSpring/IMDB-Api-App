import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieList from "../MovieList/MovieList";
import { useGetFavoriteMoviesQuery } from "../../tmdbService";
import Pagination from "../Pagination/Pagination";

const RatedCards = ({ title, movies, totalPages, listName }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetFavoriteMoviesQuery({
    page: page,
    listName: listName,
  });
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
      <Typography variant="h4" style={{ marginTop: "20px" }} align="center">
        {title}
      </Typography>
      <MovieList movies={data} numberOfMovies={20} />
      <Pagination page={page} setPage={setPage} pageCount={data?.total_pages} />
    </Box>
  );
};

export default RatedCards;
