import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: '1',
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water'
        },
        {
          id: '2',
          name: 'Stronger',
          artist: 'Britney Spears',
          album: 'Oops!... I Did It Again'
        },
        {
          id: '3',
          name: 'So Emotional',
          artist: 'Whitney Houston',
          album: 'Whitney'
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          id: '1',
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water'
        },
        {
          id: '2',
          name: 'Stronger',
          artist: 'Britney Spears',
          album: 'Oops!... I Did It Again'
        },
        {
          id: '3',
          name: 'So Emotional',
          artist: 'Whitney Houston',
          album: 'Whitney'
        }
      ]
    }
  }
  
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
