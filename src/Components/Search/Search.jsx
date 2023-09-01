import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../Store/currentGenreOrCategorySlice";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function handleKeyDown(e) {
    if (e.key === "Enter" && searchQuery.trim().length > 1) {
      dispatch(searchMovie(searchQuery));
      setSearchQuery("");
      navigate("/");
    }
  }

  return (
    <div className={classes.container}>
      <TextField
        variant="standard"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
