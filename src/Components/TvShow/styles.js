import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    width: "230px",
  },
  showImage: {
    width: "230px",
    height: "300px",
    borderRadius: "20px",
    marginBottom: "10px",
  },
  showTitle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "230px",
  },
  rating: {
    width: "230px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
}));
