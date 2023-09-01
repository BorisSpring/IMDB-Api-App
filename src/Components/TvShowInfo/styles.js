import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  showImage: {
    width: "80%",
    borderRadius: "20px",
    display: "flex",
    boxShadow: "10px 10px 4px rgba(0,0,0,0.4)",
    [theme.breakpoints.down("sm")]: {
      margin: "20px auto !important",
      width: "50%",
    },
  },
  iFrame: {
    width: "40%",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      width: "60%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "350px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
