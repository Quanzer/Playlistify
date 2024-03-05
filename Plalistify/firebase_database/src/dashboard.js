import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import UseAuth from './useAuth';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: 'd0a7c019553b471699c3e5f9119c08eb',
});

export default function Dashboard({ code }) {
    const accessToken = UseAuth(code);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [minValues, setMinValues] = useState({
        acousticness: 0,
        tempo: 0,
        danceability: 0,
        energy: 0,
        loudness: -60,
    });

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResult([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchTracks(search).then((res) => {
            if (cancel) return;

            Promise.all(
                res.body.tracks.items.map((track) => {
                    return axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                })
            ).then((responses) => {
                const searchResultsWithAudioFeatures = res.body.tracks.items.map((track, index) => {
                    const audioFeatures = responses[index].data;
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, track.album.images[0]);

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.uri,
                        audioFeatures: audioFeatures,
                    };
                });

                // Filter search results based on minimum values
                const filteredResults = searchResultsWithAudioFeatures.filter((track) => {
                    return (
                        track.audioFeatures.acousticness >= minValues.acousticness &&
                        track.audioFeatures.tempo >= minValues.tempo &&
                        track.audioFeatures.danceability >= minValues.danceability &&
                        track.audioFeatures.energy >= minValues.energy &&
                        track.audioFeatures.loudness >= minValues.loudness
                    );
                });

                setSearchResult(filteredResults);
            });
        });

        return () => (cancel = true);
    }, [search, accessToken, minValues]);

    const handleMinValueChange = (event) => {
        const { name, value } = event.target;
        setMinValues((prevValues) => ({
            ...prevValues,
            [name]: parseFloat(value),
        }));
    };

    return (
        <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
            <Form>
                <Form.Group controlId="formAcousticness">
                    <Form.Label>Minimum Acousticness</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={minValues.acousticness}
                        name="acousticness"
                        onChange={handleMinValueChange}
                    />
                </Form.Group>
                <Form.Group controlId="formTempo">
                    <Form.Label>Minimum Tempo</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        max="200"
                        value={minValues.tempo}
                        name="tempo"
                        onChange={handleMinValueChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDanceability">
                    <Form.Label>Minimum Danceability</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={minValues.danceability}
                        name="danceability"
                        onChange={handleMinValueChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEnergy">
                    <Form.Label>Minimum Energy</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={minValues.energy}
                        name="energy"
                        onChange={handleMinValueChange}
                    />
                </Form.Group>
                {/* <Form.Group controlId="formLiveness">
                    <Form.Label>Minimum Liveness</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={minValues.liveness}
                        name="liveness"
                        onChange={handleMinValueChange}
                    />
                </Form.Group> */}
                <Form.Group controlId="formLoudness">
                    <Form.Label>Minimum Loudness</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="-60"
                        max="0"
                        value={minValues.loudness}
                        name="loudness"
                        onChange={handleMinValueChange}
                    />
                </Form.Group>
            </Form>

            <Form.Control
                type="search"
                placeholder="Search song/artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
                {searchResult.map((track) => {
                    return <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />;
                })}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </Container>
    );
}
