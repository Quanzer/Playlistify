import React, { useState, useEffect } from "react";
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Track from "./Track";
import Queue from "./Queue";
import { TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';

function Dashboard() {
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");
    const [queueData, setQueueData] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchQueue() {
            const result = await axios('http://localhost:3001/queue/show');
            if (!ignore) setQueueData(result.data);
        }

        const interval = setInterval(() => {
            fetchQueue();
        }, 1000);

        return () => { ignore = true; clearInterval(interval); };
    }, []);

    useEffect(() => {
        let idArr = [];

        const searchTracks = async (searchQuery) => {
            return axios.post("http://localhost:3001/searchTracks", {
                searchString: searchQuery,
                params: { limit: 50 }
            })
                .then(res => {
                    console.log(res.data.body);
                    return res.data.body;
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        if (!search) return setSearchResults([]);

        searchTracks(search).then(res => {
            for (let i = 0; i < res.tracks.items.length; i++)
                idArr.push(res.tracks.items[i].uri.replace('spotify:track:', ''));

            let counter = -1;
            setSearchResults(
                res.tracks.items.map(track => {
                    counter++;
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        },
                        track.album.images[0]
                    );
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                        explicit: track.explicit,
                        passFilter: idArr[counter]
                    };
                })
            );
        });
    }, [search]);

    const handleSignOut = async () => {
        try {
            await firebase.auth().signOut();
            window.location.href = '/'; // Redirect to the signup/login page
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <h1>Playlistify Search Bar</h1>
            <Form.Control
                style={{ margin: 5 }}
                type="search"
                placeholder="Search Songs/Artists"
                onChange={(e) => { setSearch(e.target.value); }}
            />
            {searchResults.length === 0 ?
                <div className="flex-grow-1 my-2" style={{ height: "75vh", overflowY: "auto" }}></div>
                :
                <TableContainer component={Paper} style={{ height: "75vh", overflowY: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">Song</TableCell>
                                <TableCell align="center">Artist</TableCell>
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
            <div style={{ height: "30vh", overflowY: "auto" }}>
                <Queue trackList={queueData} />
            </div>
            <button onClick={handleSignOut}>Sign Out</button>
        </Container>
    );
}

export default Dashboard;
