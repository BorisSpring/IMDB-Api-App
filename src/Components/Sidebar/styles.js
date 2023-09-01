import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  image: {
    width: "70%",
  },
  links: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  genreImages: {
    filter: theme.palette.mode === "dark" ? "invert(1)" : "dark",
    height: "30px",
  },
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10%",
  },
}));
