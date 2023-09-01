import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    width: "100%",
    height: "440px",
    marginBottom: "20px",
  },
  cardRoot: {
    position: "relative",
  },
  card: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  cardMedia: {
    width: "100%",
    height: "440px",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    backgroundBlendMode: "darken",
  },
  cardContent: {
    position: "relative",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
