import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <span className="player-name">{this.props.name}</span>
      </div>
    );
  }
}

export default Player;
