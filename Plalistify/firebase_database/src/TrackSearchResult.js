import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track);
    }

    return (
        <div className="d-flex m-2 align-items-center" style={{ cursor: 'pointer' }} onClick={handlePlay}>
            <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} alt="Album Art" />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
                {track.audioFeatures && (
                    <div>
                        <p>Acousticness: {track.audioFeatures.acousticness}</p>
                        <p>Tempo: {track.audioFeatures.tempo}</p>
                        <p>Danceability: {track.audioFeatures.danceability}</p>
                        <p>Energy: {track.audioFeatures.energy}</p>
                        <p>Loudness: {track.audioFeatures.loudness}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
