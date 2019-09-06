import React from 'react';
import './Track.css';

const renderAction = (isRemoval) => {
    return(
        <button className="Track-action">{isRemoval ? '-' : '+'}</button>
    );
}

class Track extends React.Component {
    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>track name</h3>
                    <p>track artist | track album</p>
                </div>
                {renderAction(false)}
            </div>
        );
    }
}

export default Track;