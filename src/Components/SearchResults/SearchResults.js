import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
    return(
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
        </div>
    );
}

/* class SearchResults extends React.Component {
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        );
    }
} */

export default SearchResults;