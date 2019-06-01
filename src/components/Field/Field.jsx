import React from "react";
import { Consumer } from "../Tactics/TacticsContext";
import "./Field.scss";
import Pitch from "../Pitch";
import Player from "../Player";

class Field extends React.Component {
  renderPlayer(team, playerId, context) {
    const players = team.players;
    const teamId = team.id;

    if (!playerId) {
      return null;
    }

    const player = players.filter(player => player.id === playerId)[0];

    return (
      <div
        className="player"
        onDragStart={event => context.handleDragStart(event, teamId, playerId)}
        onDragLeave={event => context.handleDragLeave(event, team.id)}
        onDragEnd={event => context.handleDragEnd(event, team.id)}
        draggable
      >
        <Player {...player} />
      </div>
    );
  }

  render() {
    return (
      <Consumer>
        {context => (
          <div className="field-area">
            <Pitch>
              {context.teams.map((team, index) => (
                <ul className={`positions team-${index + 1}`} key={team.id}>
                  {team.tactic.positions.map(position => (
                    <li
                      style={{
                        top: position.location.top,
                        left: position.location.left
                      }}
                      key={position.id}
                      className={`pos${position.index} pos`}
                      onDragEnter={event =>
                        context.handleDragEnter(
                          event,
                          team.id,
                          position.playerId
                        )
                      }
                      onDragLeave={event =>
                        context.handleDragLeave(
                          event,
                          team.id,
                          position.playerId
                        )
                      }
                      onDragOver={event =>
                        context.handleDragOver(
                          event,
                          team.id,
                          position.playerId
                        )
                      }
                      onDrop={event =>
                        context.handleDrop(event, team.id, position.id)
                      }
                    >
                      {this.renderPlayer(team, position.playerId, context)}
                    </li>
                  ))}
                </ul>
              ))}
            </Pitch>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Field;
