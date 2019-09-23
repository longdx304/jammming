import React, {useState} from 'react';

import './SearchBar.css';

function SearchBar(props) {
    const [term, setTerm] = useState('');

    function search() {
        props.onSearch(term);
    }

    function handleTermChange(event) {
        setTerm(event.target.value);
    }

    return(
        <div className="SearchBar">
            <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            <button onClick={search} className="SearchButton">SEARCH</button>
        </div>
    );
}

/* class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }

    render() {
        return(
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        );
    }
} */

export default SearchBar;