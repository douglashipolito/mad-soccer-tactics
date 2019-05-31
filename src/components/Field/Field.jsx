import React from "react";
import { Consumer } from "../Tactics/TacticsContext";
import "./Field.scss";
import Player from "../Player";

class Field extends React.Component {
  renderPlayer(positionedPlayers, playerId, teams) {
    const positionedPlayer = positionedPlayers.filter(
      player => player.playerId === playerId
    )[0];

    if (!positionedPlayer) {
      return null;
    }

    let foundPlayer = null;

    teams.some(team => {
      return team.players.some(player => {
        if (player.id === positionedPlayer.playerId) {
          foundPlayer = player;
          return true;
        }
      });
    });

    return <Player name={foundPlayer.name} />;
  }

  render() {
    return (
      <Consumer>
        {context => (
          <div className="field-area">
            <div className="stage">
              <div className="world">
                <div className="terrain">
                  <div className="field ground">
                    <ul className="positions">
                      {context.selectedTactic.positions.map(position => (
                        <li
                          style={{
                            top: position.location.top,
                            left: position.location.left
                          }}
                          key={position.id}
                          className={`pos${position.index} pos`}
                          onDragOver={context.handleDragOver}
                          onDrop={event => context.handleDrop(event, position)}
                        >
                          {this.renderPlayer(
                            context.positionedPlayers,
                            position.playerId,
                            context.teams
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="field__texture field__texture--gradient" />
                    <div className="field__texture field__texture--gradient-b" />
                    <div className="field__texture field__texture--grass" />
                    <div className="field__line field__line--goal" />
                    <div className="field__line field__line--goal field__line--goal--far" />
                    <div className="field__line field__line--outline" />
                    <div className="field__line field__line--penalty" />
                    <div className="field__line field__line--penalty-arc" />
                    <div className="field__line field__line--penalty-arc field__line--penalty-arc--far" />
                    <div className="field__line field__line--mid" />
                    <div className="field__line field__line--circle" />
                    <div className="field__line field__line--penalty field__line--penalty--far" />
                  </div>
                  <div className="field__side" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Field;
