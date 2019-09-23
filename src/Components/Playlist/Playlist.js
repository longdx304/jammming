import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

function Playlist(props) {
    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    }

    return(
        <div className="Playlist">
            <input onChange={handleNameChange} value={props.playlistName} />
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true} />
            <button onClick={props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

/* class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return(
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
} */

export default Playlist;