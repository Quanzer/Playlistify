import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch'; // Import Switch component from MUI
import { Container } from '@mui/material'; // Import Container component from MUI
import axios from "axios";
import PasswordPromptComponent from "./PasswordPromptComponent";

  
 
const Settings = ({ theme, updateFeatureFilters, featureFilters }) => {
    console.log(featureFilters);
    const [energyMin, setEnergyMin] = useState(featureFilters.energy.min); // State for minimum energy feature
    const [energyMax, setEnergyMax] = useState(featureFilters.energy.max); // State for maximum energy feature
   
    const [instrumentalnessMin, setInstrumentalnessMin] = useState(featureFilters.instrumentalness.min); // State for minimum instrumentalness feature
    const [instrumentalnessMax, setInstrumentalnessMax] = useState(featureFilters.instrumentalness.max); // State for maximum instrumentalness feature
    const [valenceMin, setValenceMin] = useState(featureFilters.valence.min); // State for minimum valence feature
    const [valenceMax, setValenceMax] = useState(featureFilters.valence.max); // State for maximum valence feature
    const [tempoMin, setTempoMin] = useState(featureFilters.tempo.min); // State for minimum tempo feature
    const [tempoMax, setTempoMax] = useState(featureFilters.tempo.max); // State for maximum tempo feature
    const [explicit, setExplicit] = useState(featureFilters.explicit); // State for explicit feature
    const [accessToken, setAccessToken] = useState(""); // State for Spotify access token
    const [isPlaying, setIsPlaying] = useState(true); // State for playback state

    const [authenticated, setAuthenticated] = useState(false);
    const handlePasswordSubmit = (password) => {
      // Send request to server to authenticate password
      // If password is correct, set authenticated to true
      // Otherwise, display error message
      // This is a simplified example; you may need to implement actual authentication logic
      if (password === 'seniorexpo') {
        setAuthenticated(true);
      } else {
        alert('Incorrect password');
      }
    };
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
    function handleSave() {
        const update = () => {
      
            axios.post(process.env.REACT_APP_API_URL + "/filter/filterFeature/update", {
                energy: { min: energyMin, max: energyMax },
                instrumentalness: { min: instrumentalnessMin, max: instrumentalnessMax },
                valence: { min: valenceMin, max: valenceMax },
                tempo: { min: tempoMin, max: tempoMax },
                explicit: explicit
            })
            .then(res => {
              console.log(res.data);
              
            })
            .catch((err) => {
              console.log(err);
            });
          }
          update();
        updateFeatureFilters({
            energy: { min: energyMin, max: energyMax },
            instrumentalness: { min: instrumentalnessMin, max: instrumentalnessMax },
            valence: { min: valenceMin, max: valenceMax },
            tempo: { min: tempoMin, max: tempoMax },
            explicit: explicit
        });

        
        
    };
    // Function to handle slider changes
    const handleFeatureMinChange = (event, setValue) => {
        const updatedValue = parseFloat(event.target.value);
        setValue(updatedValue);
        
    };

    const handleFeatureMaxChange = (event, setValue) => {
        const updatedValue = parseFloat(event.target.value);
        setValue(updatedValue);
        
    };

    // Function to handle explicit toggle
    const handleExplicitToggle = () => {
        setExplicit(!explicit);
        
    };

    return (
      <div>
        
      {/* {!authenticated && <PasswordPromptComponent theme={theme} onPasswordSubmit={handlePasswordSubmit} />}
      {authenticated && ( */}
        <div>
          {/* Load settings page components */}
          {/* For example: */}
          <div style={{ minHeight: "100vh", width: "80vh", maxWidth: "100%" }}>
            {/* Container for the settings */}
            <Container style={{
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 100 * .045 + 'vh',
                marginLeft: 100 * .01 + 'vw',
                fontSize: 100 * 0.0145 + 'vw',
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
                        <h3>Range of Song Features Control:</h3>
                        {/* Energy slider */}
                        <div>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={energyMin}
                                    onChange={(e) => handleFeatureMinChange(e, setEnergyMin)}
                                /> Energy (Min): {energyMin}
                            </label>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={energyMax}
                                    onChange={(e) => handleFeatureMaxChange(e, setEnergyMax)}
                                /> Energy (Max): {energyMax}
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
                                    value={instrumentalnessMin}
                                    onChange={(e) => handleFeatureMinChange(e, setInstrumentalnessMin)}
                                /> Instrumentalness (Min): {instrumentalnessMin}
                            </label>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={instrumentalnessMax}
                                    onChange={(e) => handleFeatureMaxChange(e, setInstrumentalnessMax)}
                                /> Instrumentalness (Max): {instrumentalnessMax}
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
                                    value={valenceMin}
                                    onChange={(e) => handleFeatureMinChange(e, setValenceMin)}
                                /> Valence (Min): {valenceMin}
                            </label>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={valenceMax}
                                    onChange={(e) => handleFeatureMaxChange(e, setValenceMax)}
                                /> Valence (Max): {valenceMax}
                            </label>
                        </div>
                        {/* Tempo slider */}
                        <div>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={300}
                                    value={tempoMin}
                                    onChange={(e) => handleFeatureMinChange(e, setTempoMin)}
                                /> Tempo or BPM (Min): {tempoMin}
                            </label>
                            <label>
                                <input
                                    type="range"
                                    min={0}
                                    max={300}
                                    value={tempoMax}
                                    onChange={(e) => handleFeatureMaxChange(e, setTempoMax)}
                                /> Tempo or BPM (Max): {tempoMax}
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
                        <button style={{
                            fontWeight: 500,
                            color: "white",
                            backgroundColor: theme.palette.primary.main,
                            width: 13 * .29 + 'vw',
                            height: 40 * .06 + 'vh',
                            fontSize: 50 * 0.0145 + 'vw',
                            borderRadius: '.75vh',
                            marginLeft: ".2vh",
                            borderRadius: 100 * .005 + 'vh',
                            border: ".25vh solid " + theme.palette.common.border,
                            border: 'none'}} onClick={handleSave}>Save changes</button>
                        <div>
                            <div style={{ marginTop: "3vh" }}>Playback controls:</div>
                            <button style={{
                fontWeight: 500,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                width: 13 * .29 + 'vw',
                height: 40 * .06 + 'vh',
                fontSize: 50 * 0.0145 + 'vw',
                borderRadius: '.75vh',
                marginLeft: ".2vh",
                borderRadius: 100 * .005 + 'vh',
                border: ".25vh solid " + theme.palette.common.border,
                border: 'none'}} onClick={handlePlay}>Play</button>
                            <button style={{
                fontWeight: 500,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                width: 13 * .29 + 'vw',
                height: 40 * .06 + 'vh',
                fontSize: 50 * 0.0145 + 'vw',
                borderRadius: '.75vh',
                marginLeft: ".2vh",
                borderRadius: 100 * .005 + 'vh',
                border: ".25vh solid " + theme.palette.common.border,
                border: 'none'}} onClick={handlePause}>Pause</button>
                            <button style={{
                fontWeight: 500,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                width: 13 * .29 + 'vw',
                height: 40 * .06 + 'vh',
                fontSize: 50 * 0.0145 + 'vw',
                borderRadius: '.75vh',
                marginLeft: ".2vh",
                borderRadius: 100 * .005 + 'vh',
                border: ".25vh solid " + theme.palette.common.border,
                border: 'none'}} onClick={handleSkip}>Skip</button>

                        </div>
                    </div>

                </Container>

            </div>
        </div>
          {/* Add your settings page components here */}
        </div>
      {/* )} */}
    </div>
  );
        
    
};

export default Settings;
