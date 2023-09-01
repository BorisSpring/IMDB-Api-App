import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  genreIdOrCategoryName: "",
  searchTv: "",
  pageNumber: 1,
  seasson: "",
};

const genreOrCategorySlice = createSlice({
  name: "genreIdOrCategoryName",
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.searchQuery = "";
      state.genreIdOrCategoryName = action.payload;
      state.searchTv = "";
      state.seasson = "";
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
      state.seasson = "";
    },
    selectTvShow: (state, action) => {
      state.searchQuery = "";
      state.genreIdOrCategoryName = "";
      state.searchTv = action.payload;
      state.seasson = "";
    },
    selectSeasson: (state, action) => {
      state.seasson = action.payload;
    },
  },
});

export default genreOrCategorySlice.reducer;
export const {
  selectGenreOrCategory,
  searchMovie,
  selectTvShow,
  selectSeasson,
} = genreOrCategorySlice.actions;

export const genreOrCategory = (state) => state.genreIdOrCategoryName;
