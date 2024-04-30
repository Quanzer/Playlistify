import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Box from "@mui/material/Box";

const Settings = ({ accessToken }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    // Fetch playback state when component mounts
    fetchPlaybackState();
    // Fetch playlist when component mounts
    fetchPlaylist();
  }, []);

  const fetchPlaybackState = async () => {
    try {
      const response = await axios.get("/pauseplay/state", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsPlaying(response.data.isPlaying);
    } catch (error) {
      console.error("Error fetching playback state:", error);
    }
  };

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get("/playlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  const togglePlay = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "/pauseplay/toggle",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsPlaying((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      console.error("Error toggling playback:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box style={{ minHeight: "100vh", padding: "20px" }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f4f4f4",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Playback Controls</h2>
        <div style={{ marginBottom: "20px" }}>
          <IconButton onClick={togglePlay} disabled={isLoading}>
            {isLoading ? (
              "Loading..."
            ) : isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};


export default Settings;
