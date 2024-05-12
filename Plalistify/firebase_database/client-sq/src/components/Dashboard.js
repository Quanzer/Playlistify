import React, { useState, useEffect, useContext } from "react";
import '../styles/App.css'
import axios from 'axios';
import Queue from "./Queue"
import { IconButton, Container } from '@mui/material';
import DisplayResults from "./DisplayResults";
import NowPlaying from "./NowPlaying";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SocketContext } from './App'

const Dashboard = ({ theme, mode, featureFilters }) => {

  const [borderColor, setBC] = useState(".25vh solid " + theme.palette.common.border)

  const socket = useContext(SocketContext);

  const [text, setText] = useState("Loading")
  const [searchResults, setSearchResults] = useState([])
  //const [goodSongsArr, setPassArr] = useState([])
  const [dynInput, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [queueData, setQueueData] = useState([])
  const [accessToken, setAccessToken] = useState("")

  const [loading, setLoading] = useState(false)


  const [clicked, setClicked] = useState(false)
  const [keyPressed, setKeyPressed] = useState("")
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
  function handleFocus() {
    setBC(".25vh solid " + theme.palette.primary.main)
    setClicked(true)
  }

  function handleBlur() {
    setBC(".25vh solid " + theme.palette.common.border)
    setClicked(false)
  }
  useEffect(() => {
    let ignore = false;

    async function fetchToken() {
      const result = await axios(process.env.REACT_APP_API_URL + '/host/token')
      if (!ignore) setAccessToken(result.data)
    }

    fetchToken();

    return () => { ignore = true; }
  }, [])


  const handleKeyPress = (event) => {
    setKeyPressed(event.key)
    if (event.key === 'Enter') {
      // Perform change here
      setSearch(dynInput)
    }
  }

  // Hook handling retrieving the data of the queue from the backend.
  useEffect(() => {
    let ignore = false;

    async function fetchQueue() {
      const result = await axios(process.env.REACT_APP_API_URL + '/queue/show');
      if (!ignore) setQueueData(result.data);
    }
    fetchQueue();

    socket.on('queueAdd', (data) => {
      setQueueData((prevData) => [...prevData, data]);
    })

    socket.on('queuePop', (data) => {
      setQueueData((prevData) => [...prevData.slice(1)]);
    })

    return () => { ignore = true; socket.off('queueAdd'); socket.off('queuePop') }
  }, [])

  useEffect(() => {

    function loadingDots() {
      let timer = setTimeout(() => {
        setText("Loading.")
      }, 250)

      let timer2 = setTimeout(() => {
        setText("Loading..")
      }, 500)

      let timer3 = setTimeout(() => {
        setText("Loading...")
      }, 750)
    }

    if (loading) {
      loadingDots()
      setText("Loading")
    }
  }, [loading])

  // Hook handling relay of search request to backend. Backend serves as middle to Spotify API.
  useEffect(() => {

    const searchTracks = async (searchQuery) => {
      setLoading(true)
      return axios
        .post(process.env.REACT_APP_API_URL + "/search/tracks", {
          searchString: searchQuery,
          params: { limit: 50 }
        })
        .then(res => {
          setLoading(false)
          return res.data;

        })
        .catch((err) => {
          console.log(err)
        })
    }



    function filter(features) {
      var boolFilter = [];
      for (let i = 0; i < features.length; i++) {
        if (features[i] === null) {
          boolFilter.push(false);
        } else if (
          features[i].energy < featureFilters.energy.min ||
          features[i].energy > featureFilters.energy.max ||
          features[i].instrumentalness < featureFilters.instrumentalness.min ||
          features[i].instrumentalness > featureFilters.instrumentalness.max ||
          features[i].valence < featureFilters.valence.min ||
          features[i].valence > featureFilters.valence.max ||
          features[i].tempo < featureFilters.tempo.min ||
          features[i].tempo > featureFilters.tempo.max
        ) {
          boolFilter.push(false);
        } else {
          boolFilter.push(true);
        }
      }
      return boolFilter;
    }
    


    if (!search) return setSearchResults([])
    // Parse search query

    searchTracks(search).then(res => {

      console.log("AUDIO feats", res.features.audio_features)

      let boolArray = filter(res.features.audio_features)

      console.log("filter", boolArray)
      let counter = 0

      setSearchResults(
        res.tracks.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
          //Track attributes
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            albumName: track.album.name,
            songDuration: track.duration_ms,
            explicit: featureFilters.explicit == true ? false : track.explicit ,
            filter: boolArray[counter++],
            spotifyUrl: track.external_urls.spotify
          }
        })
      )
    })

  }, [search])

  return (
    <div style={{ minHeight: "100vh", width: 100 * .8 + 'vw', maxWidth: "100%" }}>
      <Container style={{
        fontFamily: "'DM Sans', sans-serif", marginTop: 100 * .045 + 'vh', marginLeft: 100 * .01 + 'vw',
        fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', fontWeight: "1000", color: theme.palette.text.primary
      }}>Dashboard</Container>
      <div style={{ display: "inline-flex", width: "100%", height: 100 + 'vh', marginTop: -100 * .00 + 'vh' }}>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif",
          marginTop: 100 * .00 + 'vh',
          marginLeft: 100 * .01 + 'vw',
          width: 100 * .303 + 'vw'
        }}>

          <div style={{ display: isHorizontal? "flex":"block", flexDirection: "row" }}>

            <input type="search" id="site-search" style={{
              marginLeft: 0,
              marginTop: 100 * .018 + 'vh',
              width: isHorizontal? 100 * 0.29 + 'vw': 100 * 0.75 + 'vw',
              height: 100 * .06 + 'vh',
              borderRadius: 100 * .02 + 'vh',
              border: borderColor,
              borderColor: theme.palette.common.border,
              paddingLeft: 100 * .027 + 'vw',
              paddingRight: 100 * .00875 + 'vw',
              backgroundColor: theme.palette.background.secondary,
              color: theme.palette.text.primary,
              fontSize: isHorizontal? 100 * 0.01 + 'vw' : 100 * 0.016 + 'vh',
            }}
              placeholder="Search for a song to queue"
              className={theme.palette.mode == 'light' ? "searchA" : "searchB"}
              onChange={(e) => { setInput(e.target.value) }}
              onKeyPress={
                handleKeyPress
              }
              onFocus={handleFocus}
              onBlur={handleBlur} />


            {isHorizontal?
            <IconButton disableRipple

              style={{
                marginTop:isHorizontal? 100 * .0235 + 'vh': 100 * .0235 + 'vw', marginLeft:isHorizontal? -100 * .2875 + 'vw':-100 * .2875 + 'vh', height:isHorizontal?100 * .05 + 'vh': 100 * .05 + 'vw',
                width: isHorizontal?100 * .05 + 'vh': 100 * .05 + 'vw', borderRadius: 80,

                color: clicked ? theme.palette.primary.main : theme.palette.common.misc
              }}
              onClick={() => {

                setSearch(dynInput)

              }}
              type="button"
              variant="contained"
              children={<SearchRoundedIcon style={{ fontSize: 100 * .02 + 'vw' }} />}
              fullWidth={false}
            >
            </IconButton>: <div></div>}


          </div>
          <div
            style={{ fontWeight: "bold", display: "flex", flexDirection: "row" }}
          >
            <div>
              {/* results component */}
              {
                keyPressed !== "Enter" && searchResults.length === 0 ?
                  (<div
                    //sx={{boxShadow:3}}
                    style={{
                      position: "relative",
                      border: '.25vh solid ' + theme.palette.common.border,
                      height:isHorizontal? 100 * 0.755 + 'vh': 100 * 0.56 + 'vh',
                      marginTop: 100 * 0.02 + 'vh',
                      overflowY: "auto",
                      width: isHorizontal? 100 * 0.29 + 'vw': 100 * 0.75 + 'vw',
                      backgroundColor: theme.palette.background.secondary,
                      borderRadius: 100 * .02 + 'vh',
                      color: theme.palette.text.primary
                    }}>

                    {!clicked ?
                      <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>
                        <div style={{ height: '25vh' }}>
                          <div style={{ color: theme.palette.text.secondary,fontWeight: 1000,fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', height: "4.25vh" }}>
                            Guidelines
                          </div>

                          <div style={{ color: theme.palette.text.secondary,fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "1.75vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              
                               fontSize: isHorizontal? "1vw": "1vh", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >1 .</div>
                            <div style={{ fontSize: isHorizontal? 100 * 0.01 + 'vw': 100 * 0.01 + 'vh', width: isHorizontal? "23vw" : "70vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                              Host can change song criteria for being added to queue.
                            </div>
                          </div>

                          <div style={{color: theme.palette.text.secondary, fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              
                              fontSize: isHorizontal? "1vw": "1vh", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >2 .</div>
                            <div style={{ fontSize: isHorizontal? 100 * 0.01 + 'vw': 100 * 0.01 + 'vh', width: isHorizontal? "23vw" : "70vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                              Check the history tab to find or add a recently played song.
                            </div>
                          </div>

                          <div style={{color: theme.palette.text.secondary, fontWeight: 500, display: "flex", flexDirection: "row", marginTop: "2vh" }}>
                            <div class="circle" style={{
                              backgroundColor: theme.palette.background.secondary,
                              
                               fontSize: isHorizontal? "1vw": "1vh", marginLeft: ".4vw", marginTop: "0.5vh"
                            }} >3 .</div>
                            <div style={{ fontSize: isHorizontal? 100 * 0.01 + 'vw': 100 * 0.01 + 'vh', width: isHorizontal? "23vw" : "70vw", marginLeft: "1vw", lineHeight: '2.5vh' }}>
                            To avoid spamming, there is a 5s timer between adding each song!
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>
                        <div style={{ height: '25vh' }}>
                          <div style={{ fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', height: "4.25vh" }}>
                            Results
                          </div>
                          {loading ?
                            <div style={{ fontSize: 100 * 0.01025 + 'vw', height: "0vh" }}>
                              {text}
                            </div>
                            :
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw' }}>
                              Your search results will show here once you <a style={{ color: theme.palette.primary.main }}>hit enter</a>
                            </div>}
                        </div>
                      </div>
                    }

<div style={{
                    opacity:  "70%",
                   
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: mode === "light" ? 4 + 'vh' : 10  + 'vh',
                    
          
                  }}> 
                
                    </div>
                  </div>) : (
                    searchResults.length != 0 ?
                      (<div style={{
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        color: "#3d435a",
                        border: '.25vh solid ' + theme.palette.common.border,
                        borderRadius: 100 * .02 + 'vh',
                        backgroundColor: theme.palette.background.secondary,
                        width: isHorizontal? 100 * 0.29 + 'vw': 100 * 0.75 + 'vw',
                        height:isHorizontal? 100 * 0.755 + 'vh': 100 * 0.56 + 'vh',
                        marginTop: 100 * 0.02 + 'vh',
                      }}>


                        <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>


                          <div style={{ fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', height: "4.25vh", color: theme.palette.text.primary }}>
                            Results
                          </div>

                          {loading ?
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "0vh", color: theme.palette.text.primary }}>
                              {text}
                            </div>
                            :
                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "0vh", color: theme.palette.text.primary }}>
                              Songs filtered by host are grayed out.
                            </div>
                          }

                        </div>

                        <DisplayResults trackList={searchResults} theme={theme} />
                      </div>)
                      :
                      (
                        <div style={{
                          overflowX: 'hidden',
                          overflowY: 'hidden',
                          color: "#3d435a",
                          border: '.25vh solid ' + theme.palette.common.border,
                          borderRadius: 100 * .02 + 'vh',
                          backgroundColor: theme.palette.background.secondary,
                          width: isHorizontal? 100 * 0.29 + 'vw': 100 * 0.75 + 'vw',
                          height:isHorizontal? 100 * 0.755 + 'vh': 100 * 0.56 + 'vh',
                          marginTop: 100 * 0.02 + 'vh',
                        }}>
                          <div style={{ padding: "1vh", fontSize: 100 * 0.0154 + 'vw', marginTop: 100 * 0.011 + 'vh', marginLeft: 100 * 0.007 + 'vw' }}>


                            <div style={{ fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', height: "4.25vh", color: theme.palette.text.primary }}>
                              Results
                            </div>

                            <div style={{ fontWeight: 500, fontSize: 100 * 0.01025 + 'vw', height: "1vh", color: theme.palette.text.primary }}>
                              Hm... We couldn’t find anything. Try searching again.
                            </div>

                            
                          </div>
                        </div>
                      )
                  )
              }
            </div>
          </div>
          {!isHorizontal?
          <div style={{
                         display: "block",
                          color: "#3d435a",
                          border: '.25vh solid ' + theme.palette.common.border,
                          borderRadius: 100 * .02 + 'vh',
                          backgroundColor: theme.palette.background.secondary,
                          width: 100 * 0.75 + 'vw',
                          height: 100 * 0.23 + 'vh',
                          marginTop: 100 * 0.02 + 'vh',
                        }}>
                            <div style={{ marginTop: "2vw",marginLeft: "2vw", height: 100 * 0.3 + 'vh' }}>
                  <h2 style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh'}}>Now playing      <div style={{color:theme.palette.text.secondary}}>   (Rotate your device to see queue!)</div> </h2>
                  {accessToken === "" ?
                    <div style={{ color: theme.palette.text.secondary, fontWeight: "100", fontSize: 100 * 0.0145+ 'vw'}}>go to /admin to authenticate</div> :
                    <NowPlaying theme={theme} mode={mode} />
                  }
                </div>
                          </div>

        :<div></div>}
        </Container>
        <Container style={{
          fontFamily: "'DM Sans', sans-serif", marginTop: 100 * .05 + 'vh',
        }}>
      {isHorizontal?
          <Container style={{
            border: '.25vh solid ' + theme.palette.common.border,
            borderRadius: 100 * .02 + 'vh',
            backgroundColor: theme.palette.background.secondary,
            height: 100 * 0.835 + 'vh',
            width: 100 * 0.4 + 'vw',
            overflowY: "hidden",
            marginTop: -100 * .032 + 'vh',
            marginLeft: -100 * .0 + 'vh',
            minWidth: 100 * .4748 + 'vw',
            overflowX: "hidden",
            fontFamily: "DM Sans"
          }}>


            <div style={{ marginLeft: -100 * .02 + 'vh' }}>
              <div style={{ marginLeft: 100 * .012 + 'vw', marginTop: 100 * .026 + 'vh' }}>
                <div style={{ height: 100 * 0.3 + 'vh' }}>
                  <h2 style={{ color: theme.palette.text.primary, fontWeight: "1000", fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh',}}>Now playing</h2>
                  {accessToken === "" ?
                    <div style={{ color: theme.palette.text.secondary, fontWeight: "100", fontSize: 100 * 0.0145+ 'vw'}}>go to /admin to authenticate</div> :
                    <NowPlaying theme={theme} mode={mode} />
                  }
                </div>
                  
                 <div >
                  <h2 style={{ color: theme.palette.text.primary, marginTop: -100 * 0.001 + 'vh', fontSize: isHorizontal? 100 * 0.0145 + 'vw' : 100 * 0.016 + 'vh', height: "4vh", fontWeight: "1000" }}>Next up</h2>

                  <div style={{ marginTop: 100 * 0.0075 + 'vh', fontSize: isHorizontal? 100 * 0.01 + 'vw': 100 * 0.01 + 'vh', fontFamily: "DM Sans", fontWeight: "bold", color: theme.palette.text.primary, fontWeight: 300 }}>
                    <span style={{ marginLeft: 100 * 0.007 + 'vw' }}> # </span>

                   
                      <span style={{ marginLeft: 100 * 0.0175 + 'vw' }}> Title </span> 
                     

                    <div style={{
                      borderTop: ".25vh solid " + theme.palette.common.border,
                      width: '100%',
                      marginTop: 100 * .00755 + 'vh',
                      height: 100 * .018 + 'vh'
                    }} />
                  </div>

                  {queueData.length === 0 ?
                    <div style={{ opacity: "50%", color: theme.palette.text.primary, marginLeft: '.5vw', fontSize: isHorizontal? 100 * 0.01 + 'vw': 100 * 0.01 + 'vh', height: "4vh", fontWeight: 300 }}>
                      No songs queued.
                    </div>
                    :
                    <Queue trackList={queueData} theme={theme} />}
                </div>
               
              </div>
            </div>
          </Container>
          : <div></div>}


        </Container>
      </div>
    </div>
  )
}

export default Dashboard;