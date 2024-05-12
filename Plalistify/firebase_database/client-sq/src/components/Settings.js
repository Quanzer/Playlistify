import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch'; // Import Switch component from MUI
import { Container, Modal, Box, div, Button } from '@mui/material'; // Import Container component from MUI
import axios from "axios";
import PasswordPromptComponent from "./PasswordPromptComponent";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
  
 
const Settings = ({ theme, updateFeatureFilters, featureFilters}) => {
    
    const [showInfoModal, setShowInfoModal] = useState(false);
    
    const handleToggleInfoModal = () => {
        setShowInfoModal(!showInfoModal);
    };
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
    const [isHorizontal, setIsHorizontal] = useState(false);

    useEffect(() => {
    const checkOrientation = () => {
      setIsHorizontal(window.innerWidth > window.innerHeight);
    };

    // Initial check
    checkOrientation();

    // Listen for resize events to update orientation
    window.addEventListener('resize', checkOrientation);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);
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
        
      {!authenticated && <PasswordPromptComponent theme={theme} onPasswordSubmit={handlePasswordSubmit} />}
      {authenticated && (
        <div>
          {/* Load settings page components */}
          {/* For example: */}
          <div style={{ minHeight: "100vh", width: "80vh", maxWidth: "100%" }}>
            {/* Container for the settings */}
            <Container style={{
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 100 * .045 + 'vh',
                marginLeft: 100 * .01 + 'vw',
                fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.0145 + 'vh',
                fontWeight: "1000",
                color: theme.palette.text.primary
            }}>
                Host Controls
            </Container>
            <div
                    //sx={{boxShadow:3}}
                    style={{
                      position: "relative",
                      border: '.25vh solid ' + theme.palette.common.border,
                      height: 100 * 0.755 + 'vh',
                      marginTop: 100 * 0.02 + 'vh',
                      marginLeft: 100 * .02 + 'vw',
                      
                      width: 100 * 0.7 + 'vw',
                      backgroundColor: theme.palette.background.secondary,
                      borderRadius: 100 * .02 + 'vh',
                      color: theme.palette.text.primary
                    }}>
                       
            {/* Container for the settings */}
            <div style={{ minHeight: "100vh", width: "80vh", maxWidth: "100%" }}>
                <Container style={{
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 100 * .00 + 'vh',
                    marginLeft: 100 * .00 + 'vw',
                    width: 100 * .75 + 'vw',
                }}>
                    
            <Modal
                open={showInfoModal}
                onClose={handleToggleInfoModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box container
                    sx={{
                        backgroundColor: theme.palette.background.third, boxShadow: "0vw .5vh 1vw 0.25vw " + theme.palette.common.boxShadow, borderRadius: '1.3vh', 
                        border: '.25vh solid ' + theme.palette.common.boxShadow,
                        color: theme.palette.text.primary,
                    position: 'absolute',
                    height: "80vh",
                    top: '50%',
                    left: '50%',
                    fontFamily: "'DM Sans', sans-serif",
                   
                    transform: 'translate(-50%, -50%)',
                    width: "70vw",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        Song Feature Information:
                        
                    </div>
                    <div style={{marginTop: "2vh"}} sx={{ mt: 2 }}>
                        {/* Add your feature information here */}
                       1. Energy: Energy refers to the intensity and activity level of a song. A higher energy value indicates a more energetic and lively song, while a lower energy value suggests a more subdued or relaxed song. For example, at a gym or during a workout session, high-energy songs might be preferred to keep the energy levels up and motivate participants.
                       </div>
                       <div style={{marginTop: "2vh"}} id="modal-modal-description" sx={{ mt: 2 }}>
                        2. Instrumentalness: Instrumentalness measures the presence of vocals in a song. A higher instrumentalness value indicates that the song is primarily instrumental, without vocals, while a lower instrumentalness value suggests that the song contains vocals. This feature is useful in settings where instrumental music is preferred, such as during meditation sessions or background music for studying or reading.
                        </div><div style={{marginTop: "2vh"}} id="modal-modal-description" sx={{ mt: 2 }}>
                        3. Valence: Valence represents the positivity or negativity of the mood conveyed by a song. A higher valence value indicates a more positive or happy mood, while a lower valence value suggests a more negative or sad mood. For example, during a corporate event or team-building activity, songs with higher valence values might be selected to create a positive and uplifting atmosphere.
                        </div><div style={{marginTop: "2vh"}} id="modal-modal-description" sx={{ mt: 2 }}>
                        4. Explicit: The explicit feature indicates whether a song contains explicit or potentially offensive content, such as explicit language or mature themes. When enabled, only songs without explicit content are played, making it suitable for family-friendly events, schools, or public spaces where explicit content is not appropriate.
                        </div><div style={{marginTop: "2vh"}} id="modal-modal-description" sx={{ mt: 2 }}>
                        By adjusting these features, the host can tailor the music selection to suit the mood, atmosphere, and audience preferences of different events or settings, ensuring an enjoyable and appropriate musical experience for everyone involved.
                    </div>
                </Box>
            </Modal>
                    {/* Settings section */}
                    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "20px", color: theme.palette.text.primary }}>
                        <h3  style={{
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 100 * .005 + 'vh',
                marginLeft: 100 * .00 + 'vw',
                fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.0145 + 'vh',
                fontWeight: "1000",
                color: theme.palette.text.primary
            }}
            >Song Feature Controls <HelpRoundedIcon onClick={handleToggleInfoModal}>Learn More About Features</HelpRoundedIcon> </h3>
                        {/* Energy slider */}
                        <div style={{ width: "60vw" }}>
  {/* Energy slider */}
  <div style={{ width: "37.5vw", display: "flex", justifyContent: "space-between" }}>
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
    </div>
    <div>
      <label>
      Energy (Max): {energyMax}
        <input

style = {{ marginLeft: ".5vw"}}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={energyMax}
          onChange={(e) => handleFeatureMaxChange(e, setEnergyMax)}
        /> 
      </label>
    </div>
  </div>

  {/* Instrumentalness slider */}
  <div style={{width: "37.5vw", display: "flex", justifyContent: "space-between" }}>
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
    </div>
    <div>
      <label>
        Instrumentalness (Max): {instrumentalnessMax}
        <input

style = {{ marginLeft: ".5vw"}}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={instrumentalnessMax}
          onChange={(e) => handleFeatureMaxChange(e, setInstrumentalnessMax)}
        /> 
      </label>
    </div>
  </div>

  {/* Valence slider */}
  <div style={{width: "37.5vw", display: "flex", justifyContent: "space-between" }}>
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
    </div>
    <div>
      <label>
      Valence (Max): {valenceMax}
        <input

style = {{ marginLeft: ".5vw"}}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={valenceMax}
          onChange={(e) => handleFeatureMaxChange(e, setValenceMax)}
        /> 
      </label>
    </div>
  </div>

  {/* Tempo slider */}
  <div style={{width: "37.5vw", display: "flex", justifyContent: "space-between" }}>
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
    </div>
    <div>
      <label>
      Tempo or BPM (Max): {tempoMax}
        <input

style = {{ marginLeft: ".5vw"}}
          type="range"
          min={0}
          max={300}
          value={tempoMax}
          onChange={(e) => handleFeatureMaxChange(e, setTempoMax)}
        /> 
      </label>
    </div>
  </div>
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
                            width: 13 * .49 + 'vw',
                            height: 40 * .06 + 'vh',
                            fontSize: isHorizontal? 50 * 0.0145 + 'vw':50 * 0.0145 + 'vh',
                            borderRadius: '.75vh',
                            marginLeft: ".2vh",
                            borderRadius: 100 * .005 + 'vh',
                            border: ".25vh solid " + theme.palette.common.border,
                            border: 'none'}} onClick={handleSave}>Save changes</button>


                        <div>
                        <div style={{
                      borderTop: ".25vh solid " + theme.palette.common.border,
                      width: '100%',
                      marginTop: 100 * .035 + 'vh',
                      height: 100 * .018 + 'vh'
                    }} />
                            <div h3  style={{
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 100 * .005 + 'vh',
                marginLeft: 100 * .00 + 'vw',
                fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.0145 + 'vh',
                fontWeight: "1000",
                color: theme.palette.text.primary
            }}>Playback controls</div>
                            <button style={{
                fontWeight: 500,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                width: 13 * .29 + 'vw',
                height: 40 * .06 + 'vh',
                fontSize: isHorizontal? 50 * 0.0145 + 'vw':50 * 0.0145 + 'vh',
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
                fontSize: isHorizontal? 50 * 0.0145 + 'vw':50 * 0.0145 + 'vh',
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
                fontSize: isHorizontal? 50 * 0.0145 + 'vw':50 * 0.0145 + 'vh',
                borderRadius: '.75vh',
                marginLeft: ".2vh",
                borderRadius: 100 * .005 + 'vh',
                border: ".25vh solid " + theme.palette.common.border,
                border: 'none'}} onClick={handleSkip}>Skip</button>

                        </div>
                        
                    </div>
                    

                    <div>
                            
                        </div>
                        
                        
                </Container>
                </div>
            </div>
        </div>
          {/* Add your settings page components here */}
        </div>
       )} 
    </div>
  );
        
    
};

export default Settings;
