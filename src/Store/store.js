import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import genreIdOrCategoryNameReducer from "./currentGenreOrCategorySlice";
import userSliceReducer from "./userSlice";
import { tmdbApi } from "../tmdbService";

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    genreIdOrCategoryName: genreIdOrCategoryNameReducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
