import React, { useState,useEffect } from "react";
import Switch from '@mui/material/Switch'; // Import Switch component from MUI
import { Container } from '@mui/material'; // Import Container component from MUI
import axios from "axios";
const Settings = ({ theme, updateFeatureFilters, featureFilters }) => {
  const [energy, setEnergy] = useState(featureFilters.energy); // State for energy feature
  const [loudness, setLoudness] = useState(featureFilters.loudness); // State for loudness feature
  const [acousticness, setAcousticness] = useState(featureFilters.acousticness); // State for acousticness feature
  const [instrumentalness, setInstrumentalness] = useState(featureFilters.instrumentalness); // State for instrumentalness feature
  const [valence, setValence] = useState(featureFilters.valence); // State for valence feature
  const [tempo, setTempo] = useState(featureFilters.tempo); // State for tempo feature
  const [explicit, setExplicit] = useState(featureFilters.explicit); // State for explicit feature
  const [accessToken, setAccessToken] = useState(""); // State for Spotify access token
  const [isPlaying, setIsPlaying] = useState(true); // State for playback state
 

  // Function to fetch Spotify access token
  useEffect(() => {
    let ignore = false;

    async function fetchToken() {
      try {
        const result = await axios(process.env.REACT_APP_API_URL + '/host/token');
        if (!ignore) {
          setAccessToken(result.data);
          setIsPlaying(featureFilters.isPlaying); // Set playback state based on initial value
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    }

    fetchToken();

    return () => { ignore = true; };
  }, [featureFilters.isPlaying]); // Listen for changes in isPlaying state

  // Function to handle playback control actions
  const handlePlay = async () => {
    try {
      await axios.put('https://api.spotify.com/v1/me/player/play', null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setIsPlaying(true); // Update playback state
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
      setIsPlaying(false); // Update playback state
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
  // Function to handle slider changes
  const handleSliderChange = (event, setValue) => {
    const updatedValue = event.target.value; // Get the updated value from the event
    setValue(updatedValue); // Set the updated value in the state
    // Update the feature filters with the updated values
    updateFeatureFilters({
      energy,
      loudness,
      acousticness,
      instrumentalness,
      valence,
      tempo,
      explicit
    });
  };

  // Function to handle explicit toggle
  const handleExplicitToggle = () => {
    setExplicit(!explicit); // Toggle the explicit state
    // Update the feature filters with the toggled explicit state
    updateFeatureFilters({
      energy,
      loudness,
      acousticness,
      instrumentalness,
      valence,
      tempo,
      explicit: !explicit
    });
  };

  return (
    <div style={{ minHeight: "100vh", width: "80vh", maxWidth: "100%" }}>
      {/* Container for the settings */}
      <Container style={{
        fontFamily: "'DM Sans', sans-serif", 
        marginTop: 100 * .045 + 'vh', 
        marginLeft: 100 * .01 + 'vw',
        fontSize: 100 * .021 + 'vw', 
        fontWeight: "1000", 
        color: theme.palette.text.primary
      }}>
        Host Controls
      </Container>
      {/* Container for the settings */}
      <div style={{ minHeight: "100vh", width: "80vh", maxWidth: "100%" }}>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif", 
          marginTop: 100 * .05 + 'vh', 
          marginLeft: 100 * .01 + 'vw',
          width: 100 * .75 + 'vw',
        }}>
          {/* Settings section */}
          <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "20px", color: theme.palette.text.primary }}>
            <h3>Minimum Song Feature Settings:</h3>
            {/* Energy slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={energy}
                  onChange={(e) => handleSliderChange(e, setEnergy)}
                /> Energy: {energy}
              </label>
            </div>
            {/* Loudness slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={loudness}
                  onChange={(e) => handleSliderChange(e, setLoudness)}
                /> Loudness: {loudness}
              </label>
            </div>
            {/* Acousticness slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={acousticness}
                  onChange={(e) => handleSliderChange(e, setAcousticness)}
                /> Acousticness: {acousticness}
              </label>
            </div>
            {/* Instrumentalness slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={instrumentalness}
                  onChange={(e) => handleSliderChange(e, setInstrumentalness)}
                /> Instrumentalness: {instrumentalness}
              </label>
            </div>
            {/* Valence slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={valence}
                  onChange={(e) => handleSliderChange(e, setValence)}
                /> Valence: {valence}
              </label>
            </div>
            {/* Tempo slider */}
            <div>
              <label>
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={tempo}
                  onChange={(e) => handleSliderChange(e, setTempo)}
                /> Tempo: {tempo}
              </label>
            </div>
            {/* Explicit toggle */}
            <div>
              <label>
                Enable Explicit Songs:
                <Switch
                  checked={explicit}
                  onChange={handleExplicitToggle}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </label>
            </div>
            <div>
              <div style={{marginTop:"3vh"}}>Playback state: {isPlaying ? "Playing" : "Paused"}</div>
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
             
            </div>
          </div>
          
        </Container>
 
      </div>
    </div>
  );
};

export default Settings;
