import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  spaceAroundContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  movieImage: {
    width: "80%",
    borderRadius: "20px",
    boxShadow: "10px 10px 10px rgb(0,0,0,0.4)",
    display: "flex",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "center",
      width: "300px",
      margin: "20px auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
    },
  },
  genreLink: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  genreImage: {
    height: "30px",
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  },
  actorImage: {
    width: "100%",
    maxWidth: "7em",
    height: "8em",
    objectFit: "cover",
    borderRadius: "20px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iframe: {
    width: "50%",
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40%",
    },
  },
  actorLink: {
    textDecoration: "none",
  },
}));
