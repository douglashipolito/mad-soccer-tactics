import React from "react";
import { Consumer } from "../Tactics/TacticsContext";
import "./PlayersList.scss";

class PlayersList extends React.Component {
  render() {
    const team = this.props.team;
    if (!team) {
      return null;
    }

    return (
      <Consumer>
        {context => (
          <section
            className="team-container player-list-container"
            key={team.id}
          >
            <h2 className="team-name">{team.name}</h2>
            <div className="player-list">
              <ul className="team-list">
                {team.players.map(player => (
                  <li
                    className={`player${player.selected ? " selected" : ""}`}
                    key={player.id}
                  >
                    <h3 className="player-name">
                      <span>
                        {player.name} - <small>{player.role}</small>
                      </span>
                    </h3>
                    <figure
                      className="player-image-container"
                      onDragStart={event =>
                        !player.selected
                          ? context.handleDragStart(event, team.id, player.id)
                          : false
                      }
                      onDragLeave={event =>
                        context.handleDragLeave(event, team.id)
                      }
                      onDragEnd={event => context.handleDragEnd(event, team.id)}
                      draggable={team.configurable ? !player.selected : false}
                    >
                      <img
                        className="player-avatar"
                        src={player.avatar}
                        alt={player.name}
                      />
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </Consumer>
    );
  }
}

export default PlayersList;
