import { useState, useEffect } from "react"
import axios from 'axios';

export default function Settings  ({theme}) {
  const [accessToken, setAccessToken] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    async function fetchToken() {
      const result = await axios(process.env.REACT_APP_API_URL + '/host/token')
      setAccessToken(result.data)
    }

    fetchToken();
  }, [])

  const handlePlay = async () => {
    try {
      await axios.put('https://api.spotify.com/v1/me/player/play', null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing:', error);
    }
  };

  const handlePause = async () => {
    try {
      await axios.put('https://api.spotify.com/v1/me/player/pause', null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setIsPlaying(false);
    } catch (error) {
      console.error('Error pausing:', error);
    }
  };

  const handleSkip = async () => {
    try {
      await axios.post('https://api.spotify.com/v1/me/player/next', null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      console.error('Error skipping:', error);
    }
  };

  if (!accessToken) return null;

  return (
    <div style = {{color: theme.palette.text.primary}}>
      <div >Playback Controls</div>
      <button style = {{
        position: "relative",
        border: '.25vh solid ' + theme.palette.common.border,
        overflowY: "auto",
        backgroundColor: theme.palette.text.primary,
        borderRadius: 100 * .015 + 'vh',
        color: theme.palette.common.border,
      }} onClick={handlePlay}>Play</button>
      <button style = {{
        position: "relative",
        border: '.25vh solid ' + theme.palette.common.border,
        overflowY: "auto",
        backgroundColor: theme.palette.text.primary,
        borderRadius: 100 * .015 + 'vh',
        color: theme.palette.common.border,
      }}  onClick={handlePause}>Pause</button>
      <button style = {{
        position: "relative",
        border: '.25vh solid ' + theme.palette.common.border,
        overflowY: "auto",
        backgroundColor: theme.palette.text.primary,
        borderRadius: 100 * .015 + 'vh',
        color: theme.palette.common.border,
      }}  onClick={handleSkip}>Skip</button>
      <p>Playback state: {isPlaying ? "Playing" : "Paused"}</p>
    </div>
  )
}
