import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../../Store/userSlice";
import RatedCards from "../RatedCards/RatedCards";
import { useNavigate } from "react-router-dom";
import { DoorBackOutlined } from "@mui/icons-material";
const Profile = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Profile: {user?.username}
        </Typography>
        <Button
          onClick={handleLogout}
          variant="text"
          color="inherit"
          endIcon={<DoorBackOutlined />}
        >
          Logout
        </Button>
      </Box>
      <RatedCards title="Favorite Movies" listName="favorite/movies" />
      <RatedCards title="Watchlist Movies" listName="watchlist/movies" />
    </Box>
  );
};

export default Profile;
