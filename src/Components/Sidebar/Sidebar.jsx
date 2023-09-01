import React from "react";
import useStyles from "./styles";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useGetGenresQuery } from "../../tmdbService";
import { Link } from "react-router-dom";
import genres from "../../assets/genres";
import { useDispatch } from "react-redux";
import {
  selectGenreOrCategory,
  selectTvShow,
} from "../../Store/currentGenreOrCategorySlice";
import {
  CalendarToday,
  EventOutlined,
  Star,
  StarOutline,
  StarOutlineOutlined,
  StarOutlined,
} from "@mui/icons-material";

const Categories = [
  { label: "Popular", value: "popular" },
  { label: "Top rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const tvSeries = [
  { label: "Top rated", value: "top_rated", icon: <EventOutlined /> },
  { label: "Popular", value: "popular", icon: <StarOutlineOutlined /> },
  { label: "On the Air", value: "on_the_air", icon: <EventOutlined /> },
  { label: "Airing Today", value: "airing_today", icon: <CalendarToday /> },
];

const Sidebar = () => {
  const { data, isFetching } = useGetGenresQuery();
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src="https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png"
          alt="filmpire logo"
          className={classes.image}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader className={classes.header}>Categories</ListSubheader>
        {Categories.map(({ label, value }) => (
          <Link
            to="/"
            key={value}
            className={classes.links}
            onClick={() => dispatch(selectGenreOrCategory(value))}
          >
            <ListItem>
              <ListItemIcon>
                <img
                  src={genres[label.toLowerCase()]}
                  alt={`${label} category`}
                  className={classes.genreImages}
                />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {data?.genres?.map?.(({ id, name }) => (
          <Link
            to="/"
            key={id}
            className={classes.links}
            onClick={() => dispatch(selectGenreOrCategory(id))}
          >
            <ListItem>
              <ListItemIcon>
                <img
                  src={genres[name.toLowerCase()]}
                  alt={`${name} genre`}
                  className={classes.genreImages}
                />
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <ListSubheader>Tv series lists</ListSubheader>
        {tvSeries.map(({ label, value, icon }) => (
          <Link
            to={`/tvShow`}
            className={classes.links}
            onClick={() => dispatch(selectTvShow(value))}
            key={label}
          >
            <ListItem>
              <span style={{ width: "30px", height: "30px" }}>{icon}</span>
              {label}
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
