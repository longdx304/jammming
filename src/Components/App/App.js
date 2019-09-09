import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const searchTracks = [
  {
    id: '1',
    name: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water',
    uri: `uri1`
  },
  {
    id: '2',
    name: 'Stronger',
    artist: 'Britney Spears',
    album: 'Oops!... I Did It Again',
    uri: `uri2`
  },
  {
    id: '3',
    name: 'So Emotional',
    artist: 'Whitney Houston',
    album: 'Whitney',
    uri: `uri3`
  }
]

let savedPlaylistTracks = [
  {
    id: '1',
    name: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water',
    uri: `uri1`
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchTracks,
      playlistName: 'New Playlist',
      playlistTracks: savedPlaylistTracks
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      savedPlaylistTracks.push(track);
      this.setState({
        playlistTracks: savedPlaylistTracks
      });
    }
  }

  removeTrack(track) {
    savedPlaylistTracks = this.state.playlistTracks.filter((savedTrack, index, arr) => {
      return savedTrack.id !== track.id
    })
    this.setState({
      playlistTracks: savedPlaylistTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => {
      return playlistTrack.uri;
    })
    console.log(trackURIs);
  }
  
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
