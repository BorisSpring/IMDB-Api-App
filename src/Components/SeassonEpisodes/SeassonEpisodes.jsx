import React from "react";
import { Box, ListItem, Typography } from "@mui/material";

const SeassonEpisodes = ({ episode }) => {
  return (
    <ListItem display="flex">
      <Box>
        <Box>
          <Typography variant="h6">
            Episode {episode?.episode_number} - {episode?.name} (
            {episode.runtime}
            min)
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">{episode?.overview}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default SeassonEpisodes;
