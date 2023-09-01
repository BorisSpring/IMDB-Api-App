import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ setPage, page, pageCount }) => {
  function handlePrev() {
    if (page > 1) {
      setPage((prev) => {
        return prev - 1;
      });
    }
  }
  function handleNext() {
    if (page < pageCount) {
      setPage((next) => next + 1);
    }
  }
  if (pageCount < 2 || isNaN(pageCount)) return null;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display="flex"
        gap="10px"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" onClick={handlePrev}>
          Prev
        </Button>
        <Typography variant="subtitle1">{page}</Typography>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
