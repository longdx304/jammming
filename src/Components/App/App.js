import React, {useState, useEffect} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

let savedPlaylistTracks = [];

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  });

  function removeTrack(track) {
    savedPlaylistTracks = playlistTracks.filter((savedTrack, index, arr) => {
      return savedTrack.id !== track.id
    });
    setPlaylistTracks(savedPlaylistTracks);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(playlistTrack => {
      return playlistTrack.uri;
    })
    Spotify.savePlaylist(playlistName, trackURIs).then(playlistVersion => {
      savedPlaylistTracks = [];
      setPlaylistName('New Playlist');
      setPlaylistTracks(savedPlaylistTracks);
    })
  }

  function addTrack(track) {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      savedPlaylistTracks.push(track);
      setPlaylistTracks([...savedPlaylistTracks]);
    }
  }

  function search(term) {
    Spotify.search(term).then(tracks => {
      setSearchResults(tracks);
    });
  }

  return(
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

/* class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    Spotify.getAccessToken();
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
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(playlistVersion => {
      savedPlaylistTracks = [];
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: savedPlaylistTracks
      });
    })
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
  }
  
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
} */

export default App;
