import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  actorImage: {
    borderRadius: "20px",
    width: "70%",
    [theme.breakpoints.down("lg")]: {
      width: "50%",
      marginBottom: "20px",
      height: "auto",
      display: "flex",
      margin: "0 auto",
    },
  },
}));
