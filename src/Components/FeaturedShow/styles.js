import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    width: "100%",
    height: "400px",
    position: "relative",
    alignItems: "end",
  },
  media: {
    height: "400px",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    backgroundBlendMode: "darken",
  },
  cardContent: {
    position: "relative",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "75%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
