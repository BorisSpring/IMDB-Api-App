import React, { useContext, useEffect, useState } from "react";
import useStlyes from "./styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useMediaQuery,
  Drawer,
  Avatar,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../Store/userSlice";
import { createSessionId, fetchToken, moviesApi } from "../../utils/Helpers";
import { useNavigate } from "react-router-dom";
import { ToggleColorContext } from "../../utils/ToggleColorMode";
import { useTheme } from "@emotion/react";

const Navbar = () => {
  const classes = useStlyes();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request_token = localStorage.getItem("request_token");
  const storageSession = localStorage.getItem("session_id");
  const colorMode = useContext(ToggleColorContext);
  const theme = useTheme();
  useEffect(() => {
    async function login() {
      if (request_token) {
        if (storageSession) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${storageSession}`
          );
          dispatch(setUser(userData));
        } else {
          const session = await createSessionId();
          const { data: user } = await moviesApi.get(
            `/account?session_id=${session}`
          );
          dispatch(setUser(user));
        }
      }
    }
    login();
  }, [request_token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {!isMobile && <Search />}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => fetchToken()}>
              LOGIN &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Avatar
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              alt="Profile"
              // src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
              onClick={() => navigate("/profile")}
            />
          )}
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {isMobile ? (
          <Drawer
            anchor="left"
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen((prev) => !prev)}
            ModalProps={{ keepMounted: true }}
            classes={{ paper: classes.drawPaper }}
          >
            <Sidebar />
          </Drawer>
        ) : (
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen((prev) => !prev)}
            variant="permanent"
            classes={{ paper: classes.drawPaper }}
          >
            <Sidebar />
          </Drawer>
        )}
      </nav>
    </>
  );
};

export default Navbar;
