import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Movies from "./Components/Movies/Movies";
import Navbar from "./Components/Navbar/Navbar";
import useStyles from "./styles";
import { CssBaseline } from "@mui/material";
import MovieInformation from "./Components/MovieInformation/MovieInformation";
import Actor from "./Components/Actor/Actor";
import Profile from "./Components/Profile/Profile";
import TvShowPage from "./Components/TvShowPage/TvShowPage";
import { TvShowInfo } from "./Components/TvShowInfo/TvShowInfo";
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.tooltip} />
        <Routes>
          <Route exact path="/tvShow/:id" element={<TvShowInfo />} />
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/profile/:id" element={<Actor />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/tvShow" element={<TvShowPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
