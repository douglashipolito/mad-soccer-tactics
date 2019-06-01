import React from "react";
import "./Player.scss";

class Player extends React.Component {
  render() {
    return (
      <div className="player-component">
        <span className="player-name">{this.props.name}</span>
        <figure className="player-image-container">
          <img
            className="img-responsive player-image"
            alt={this.props.name}
            src={this.props.avatar}
          />
        </figure>
      </div>
    );
  }
}

export default Player;
