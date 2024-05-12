import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Slide, Fade, Zoom, TableCell, TableRow } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { IconButton } from '@mui/material';

const Track = ({ track, clickable, num, theme }) => {
  const [clicked, setClicked] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [fade, setSlide] = useState(true);
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
  let unqueueable = !track.filter || track.explicit;

  function handleAdd() {
    const queueRequest = () => {
      if (!track.explicit && track.filter &&  clickable) {
        axios.post(process.env.REACT_APP_API_URL + "/queue/add", {
          title: track.title,
          artist: track.artist,
          albumUrl: track.albumUrl,
          albumName: track.albumName,
          songDuration: track.songDuration,
          uri: track.uri,
          explicit: track.explicit,
          spotifyUrl: track.spotifyUrl
        })
        .then(res => {
          console.log(res.data);
          if (res.data === 'PASS') {
            localStorage.setItem('time-queued', JSON.stringify(new Date().getTime()));
            setClicked(true);
            setDisabled(true);
            setTimeout(() => {
              setClicked(false);
            }, 3000);
            setTimeout(() => {
              setSlide(false);
            }, 2700);
          } else {
            console.log('Failed to add to queue');
            setDisabled(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

    const interval = 5000; // Allowed interval in milliseconds
    let lastQueued = localStorage.getItem('time-queued');
    if (!lastQueued) {
      queueRequest();
    } else {
      let time = new Date().getTime();
      let check = Math.abs(lastQueued - time);
      if (check < interval) {
        console.log('Wait to add to queue again');
      } else {
        queueRequest();
      }
    }
  }

  function secondsToMinutes(milliSeconds) {
    let seconds = parseFloat((milliSeconds / 1000) % 60).toFixed(0);
    let minutes = Math.floor((milliSeconds / 1000) / 60);
    if (seconds < 10) {
      return minutes.toString() + ":0" + seconds.toString();
    }
    return minutes.toString() + ":" + seconds.toString();
  }

  return (
    <>
      {clickable === false ?
        <Fade key={num && track.title} in={true} timeout={1000}>
          <TableRow>
            <TableCell style={{ padding: "0"}}>
              <div style={{ width: '2vw', textAlign: 'center', fontSize: isHorizontal? 100 * 0.010 + 'vw': 100 * 0.010 + 'vh', fontWeight: 500, fontFamily: "DM Sans", opacity: '75%', color: theme.palette.text.primary }}>
                {num + 1}
              </div>
            </TableCell>
            <TableCell style={{ padding:  ".7vh 1.6vw", width: isHorizontal?100 * 0.01 + 'vw':100 * 0.01 + 'vh' }} align="left">
              <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                <img className="bigger" src={track.albumUrl} alt={track.title} style={{     borderRadius: isHorizontal? 100 * .005 + 'vh':100 * .005 + 'vw',
              border: ".05vh solid " + theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.background.secondary, height: 100 * 0.02625 + 'vw', width: "100*0.02625+ 'vw'" }} />
              </a>
            </TableCell>
            <div style={{ marginLeft: -100 * 0.007 + 'vw', alignItems: "center", align: "center"}}>
              <TableCell className="bigger2" style={{ transformOrigin: "left", padding:"1.15vh .3vw", width: isHorizontal?100 * 0.3 + 'vw':100 * 0.3 + 'vh', fontFamily: "DM Sans", color: theme.palette.text.primary }} align="left">
                <div style={{ marginBottom: -100 * 0.002 + 'vh', fontWeight: 700, fontSize: isHorizontal? 100 * 0.010 + 'vw': 100 * 0.010 + 'vh', width: "50vw"}}>
                  {track.title.length > 70 ? track.title.substring(0, 67) + "..." : track.title}
                </div>
                <div style={{ opacity: '75%', fontWeight: 300, color: theme.palette.text.primary, fontSize: 100 * 0.008 + 'vw'}}>
                  {track.artist}
                </div>
              </TableCell>
            </div>
          </TableRow>
        </Fade> :
        <Slide direction='down' in={true} timeout={500}>
          <TableRow>
            <div style={{ width: '.9vw', marginLeft: -100 * 0.007 + 'vw'}}></div>
            <TableCell style={{ padding: ".75vh  1.1vw", width: isHorizontal?100 * 0.01 + 'vw':100 * 0.01 + 'vh'}} align="left">
              <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                <img className="bigger" src={track.albumUrl} alt={track.title} style={{     borderRadius: isHorizontal? 100 * .005 + 'vh':100 * .005 + 'vw',
              border: ".05vh solid " + theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.background.secondary,height: 100 * 0.034 + 'vw', width: isHorizontal? 100 * 0.034 + 'vw': 100 * 0.04 + 'vh',
              height: isHorizontal? 100 * 0.034 + 'vw': 100 * 0.04 + 'vh'}}
               />
              </a>
            </TableCell>
            <div style={{ marginLeft: -100 * 0.007 + 'vw', alignItems: "center", align: "center"}}>
              <TableCell className="bigger2" style={{ transformOrigin: "left", padding: "1.3vh .6vw", width: isHorizontal?100 * 0.3 + 'vw':100 * 0.3 + 'vh', fontFamily: "DM Sans", color: theme.palette.text.primary}} align="left">
                <div style={{ fontWeight: "bold", fontSize: isHorizontal? 100 * 0.011 + 'vw': 100 * 0.011 + 'vh'}}>
                  {track.title.length > 35 ? track.title.substring(0, 32) + "..." : track.title}
                </div>
                <div style={{ opacity: '75%', fontWeight: 500, color: theme.palette.text.primary, fontSize: isHorizontal? 100 * 0.010 + 'vw': 100 * 0.010 + 'vh'}}>
                  {track.artist}
                </div>
              </TableCell>
            </div>
            <TableCell style={{ padding: "0vh", paddingRight: "0vw"}} align="right">
              {
               !unqueueable &&
                 clickable ?
                <IconButton onClick={handleAdd} disabled={disable} disableRipple disableTouchRipple style={{}}>
                  {
                    !clicked ?
                      !disable ?
                        <AddRoundedIcon className="button" sx={{ fontSize: !isHorizontal?'2.2vh': '2.2vw'}}/>
                        :
                        <Zoom in={disable} timeout={300}>
                          <AddRoundedIcon sx={{ color: theme.palette.common.disButton, fontSize: !isHorizontal?'2.2vh': '2.2vw'}}/>
                        </Zoom>
                      :
                      <Zoom in={fade} timeout={300}>
                        <CheckRoundedIcon sx={{ fontSize: !isHorizontal?'2.2vh': '2.2vw', color: theme.palette.primary.main }}/>
                      </Zoom>
                  }
                </IconButton>
                :
                clickable ?
                  <IconButton variant = "outlined" disabled style={{ color: theme.palette.common.disButton }}>
                  <AddRoundedIcon sx={{ fontSize: !isHorizontal?'2.2vh': '2.2vw',}} />
                </IconButton> : null
              }
            </TableCell>
          </TableRow>
        </Slide>
      }
    </>
  );
};

export default Track;

