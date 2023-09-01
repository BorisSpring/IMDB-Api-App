import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  seasson: {
    width: "50%",
    backgroundColor: "#e9ecef",
    marginBottom: "15px",
    display: "flex",
    cursor: "pointer",
    flexWrap: "wrap",
    borderRadius: "20px",
    transition: "0.5s all",
    "&:hover": {
      backgroundColor: "#dee2e6",
    },
  },
}));
