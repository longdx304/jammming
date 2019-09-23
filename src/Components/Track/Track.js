import React, {useState} from 'react';
import './Track.css';

function Track(props) {
    const [play, setPlay] = useState(false);
    
    function tooglePlay(event) {
        const preview = document.getElementById(`preview_${props.track.id}`);
        setPlay(!play);
        play ? preview.pause() : preview.play();
        
    }

    function addTrack(event) {
        props.onAdd(props.track);
    }

    function removeTrack(event) {
        props.onRemove(props.track);
    }

    return(
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
                <audio src={props.track.previewUrl} id={`preview_${props.track.id}`} />
            </div>
            <div>
                <button onClick={props.track.previewUrl ? tooglePlay : null}><i className={play ? "fas fa-pause" : "fas fa-play"}></i></button>
                <button onClick={props.isRemoval ? removeTrack : addTrack} className="Track-action">{props.isRemoval ? '-' : '+'}</button>
            </div>
        </div>
    );
}

/* class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.tooglePlay = this.tooglePlay.bind(this);
    }

    renderAction(isRemoval) {
        return(
            <div>
                <button onClick={this.tooglePlay}><i className={this.state.play ? "fas fa-pause" : "fas fa-play"}></i></button>
                <button onClick={isRemoval ? this.removeTrack : this.addTrack} className="Track-action">{isRemoval ? '-' : '+'}</button>
            </div>
        );
    }

    tooglePlay(event) {
        const preview = document.getElementById(`preview_${this.props.track.id}`);
        this.setState({play: !this.state.play}, () => {
            this.state.play ? preview.play() : preview.pause();
        });
    }
    
    addTrack(event) {
        this.props.onAdd(this.props.track);
    }

    removeTrack(event) {
        this.props.onRemove(this.props.track);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio src={this.props.track.previewUrl} id={`preview_${this.props.track.id}`} />
                </div>
                {this.renderAction(this.props.isRemoval)}
            </div>
        );
    }
} */

export default Track;