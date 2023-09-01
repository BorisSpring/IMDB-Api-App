import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  toolBar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "235px",
    alignItems: "center",
    padding: "10px 10px 0 10px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      flexWrap: "wrap",
    },
  },
  textField: {
    outline: "none",
  },
}));
