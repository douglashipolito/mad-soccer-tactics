import React from "react";
import { Consumer } from "../Tactics/TacticsContext";
import "./Field.scss";
import Pitch from "../Pitch";
import Player from "../Player";

class Field extends React.Component {
  // Drag Start
  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target;
    const xOffset = +(target.dataset.xOffset ? target.dataset.xOffset : 0);
    const yOffset = +(target.dataset.yOffset ? target.dataset.yOffset : 0);

    target.dataset.active = "false";
    target.dataset.initialX = event.clientX - xOffset;
    target.dataset.initialY = event.clientY - yOffset;

    if (target.classList.contains("dragabble-position")) {
      target.dataset.active = "true";
    }
  };

  // Drag End
  handleMouseUp = event => {
    const target = event.target;

    target.dataset.initialX = 0;
    target.dataset.initialY = 0;
    target.dataset.active = "false";
  };

  // Drag Move
  handleMouseMove = event => {
    const target = event.target;

    if (target.dataset.active === "true") {
      event.preventDefault();

      target.dataset.currentX = event.clientX - +target.dataset.initialX;
      target.dataset.currentY = event.clientY - +target.dataset.initialY;
      target.dataset.xOffset = target.dataset.currentX;
      target.dataset.yOffset = target.dataset.currentY;

      target.parentElement.style.transform =
        "translate3d(" +
        target.dataset.currentX +
        "px, " +
        target.dataset.currentY +
        "px, 0)";
    }
  };

  renderPlayer(team, playerId, context) {
    const players = team.players;
    const teamId = team.id;

    if (!playerId) {
      return <div className="dragabble-position" />;
    }

    const player = players.filter(player => player.id === playerId)[0];

    return (
      <React.Fragment>
        <div className="dragabble-position" />
        <div
          className="player"
          onDragStart={event =>
            context.handleDragStart(event, teamId, playerId)
          }
          onDragLeave={event => context.handleDragLeave(event, team.id)}
          onDragEnd={event => context.handleDragEnd(event, team.id)}
          draggable
        >
          <Player {...player} />
        </div>
      </React.Fragment>
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
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                      style={{
                        top: position.location.top,
                        left: position.location.left
                      }}
                      key={position.id}
                      className={`pos${position.index} pos`}
                      onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp}
                      onMouseMove={this.handleMouseMove}
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
