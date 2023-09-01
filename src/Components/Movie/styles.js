import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movieLink: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: theme.palette.text.primary,
    width: "200px",
    margin: "20px auto",
    padding: "10px",
  },
  movieImage: {
    width: "200px",
    borderRadius: "20px",
    marginBottom: "10px",
    height: "300px",
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.07)",
    },
  },
  movieTitle: {
    textOverflow: "ellipsis",
    width: "200px",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
