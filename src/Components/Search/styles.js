import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
  },
  input: {
    color: theme.palette.mode !== "light" && "dark",
    filter: theme.palette.mode === "light" && "invert(1)",
  },
}));
