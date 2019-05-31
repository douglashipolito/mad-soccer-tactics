import React from "react";
import { Consumer } from "../Tactics/TacticsContext";
import "./PlayersList.scss";

class PlayersList extends React.Component {
  render() {
    return (
      <Consumer>
        {context =>
          context.teams.map(team => (
            <section className="team-container" key={team.id}>
              <h2 className="team-name">{team.name}</h2>
              <div className="player-list">
                <ul className="team-list">
                  {team.players.map(player => (
                    <li
                      className="player"
                      key={player.id}
                      onDragStart={event =>
                        context.handleDragStart(event, player, team.id)
                      }
                      draggable
                    >
                      <h3 className="role">{player.role}</h3>
                      <figure className="player-image-container">
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
          ))
        }
      </Consumer>
    );
  }
}

export default PlayersList;
