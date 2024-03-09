import React, { useState, useEffect } from "react";
//import useAuth from "./useAuth";
import {Container, Form} from 'react-bootstrap';
//import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/App.css'
import axios from 'axios';
import Track from "./Track"
import Queue from "./Queue"
import {  TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';

function Dashboard(){
    
    //const spotifyApi = new SpotifyWebApi();
    //const accessToken = useAuth(code)
    //spotifyApi.setAccessToken(accessToken);
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("")
    const [queueData, setQueueData] = useState([])

    // Hook handling retrieving the data of the queue from the backend.
    useEffect(() => {
      let ignore = false; 

      async function fetchQueue() {
        const result = await axios('http://localhost:3001/queue/show');
        if (!ignore) setQueueData(result.data);
      }

      const interval = setInterval(() => {
        fetchQueue();
      }, 1000);

      return () => {ignore = true; clearInterval(interval);}
    }, [])


    // Hook handling relay of search request to backend. Backend serves as middle to Spotify API.
    useEffect(() => {
      let idArr = [];
      //var pass = [];

      //song features to use for host filtering 
      const getFeats = async(arr) => {
        return axios
          .post("http://localhost:3001/getAudioFeaturesForTracks", {
            idArr : arr,
           //accessToken : accessToken,
          })
          .then(res => {
            //console.log(res.data.body)
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      }
      const searchTracks = async(searchQuery) => {
        return axios
          .post("http://localhost:3001/searchTracks", {
            searchString : searchQuery,
            params: {limit: 50}
           //accessToken : accessToken,
          })
          .then(res => {
            console.log(res.data.body)
            return res.data.body;
          })
          .catch((err) => {
            console.log(err)
          })
      } 
      
        
    
      if(!search) return setSearchResults([])
      //if(!accessToken) return
      // Parse search query
      searchTracks(search).then(res => {
        
        //get id array from search
        for(let i = 0; i < res.tracks.items.length; i++)
          idArr.push(res.tracks.items[i].uri.replace('spotify:track:', ''))

        
        
        let counter = -1
        setSearchResults(
          res.tracks.items.map(track => {
            counter++
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )
            //Track attributes
            //console.log(track.name)
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              explicit: track.explicit,
              passFilter: idArr[counter]
            }
          })
        )
      })
      
    }, [search])

    return (

    // Dashboard Component 
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        <h1>Playlistify Search Bar</h1>
        <Form.Control
            style={{margin:5}}
            type="search"
            placeholder="Search Songs/Artists"
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        {searchResults.length === 0?
          <div className="flex-grow-1 my-2" style={{ height: "75vh", overflowY: "auto"}}></div>
          :
          <TableContainer component={Paper} style={{ height: "75vh", overflowY: "auto"}}>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Song</TableCell>
                <TableCell align="center" >Artist</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map(track => (
                  <Track 
                    track={track}
                    key={track.uri}
                    clickable={true}
                    />
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
        <h1>Queue</h1>
        <div style= {{ height: "80vh", overflowY: "auto"}}>
          <Queue trackList={queueData} />
        </div>
    </Container> 
    )}

export default Dashboard;