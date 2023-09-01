import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    // overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    width: "100%",
    overflowY: "hidden",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "250px",
      padding: "40px",
    },
  },
  tooltip: {
    height: "70px",
  },
}));
