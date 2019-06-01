import React from "react";
import { Provider } from "./TacticsContext";
import PlayersList from "../PlayersList";
import Field from "../Field";
import teamsData from "../../../data/teams.json";
import tacticsData from "../../../data/tactics.json";
import "./Tactics.scss";
import TacticSelector from "../TacticSelector";

class Tactics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      changePlayerPosition: this.changePlayerPosition,
      handleDragStart: this.handleDragStart,
      handleDragEnter: this.handleDragEnter,
      handleDragLeave: this.handleDragLeave,
      handleDragOver: this.handleDragOver,
      handleDrop: this.handleDrop,
      handleDragEnd: this.handleDragEnd,
      tactics: tacticsData,
      handleTacticChange: this.handleTacticChange
    };
  }

  componentDidMount() {
    this.setTeamsTactics();
  }

  handleTacticChange = (event, teamId) => {
    const tactic = this.state.tactics.filter(
      tactic => tactic.id === event.target.value
    )[0];

    const teams = this.state.teams.map(team => {
      if (team.id === teamId) {
        const previousTactic = team.tactic;
        team.tactic = Object.assign({}, tactic);
        team.tacticId = tactic.id;

        // Positioning back all players already positioned
        previousTactic.positions.forEach(previousPosition => {
          if (!previousPosition.playerId) {
            return;
          }

          team.tactic.positions.some(position => {
            if (position.index === previousPosition.index) {
              position.playerId = previousPosition.playerId;
              return true;
            }
          });
        });
      }

      return team;
    });

    this.setState({ teams });
  };

  setTeamPosition(team) {
    const positions = [];
    let playersIds = team.players.map(player => {
      player.selected = true;
      return player.id;
    });

    team.tactic.positions.forEach(position => {
      const newPosition = Object.assign({}, position);
      newPosition.playerId = playersIds.pop();
      positions.push(newPosition);
    });

    team.tactic.positions = positions;
  }

  setTeamsTactics() {
    const teams = teamsData.map(team => {
      const tactic = tacticsData.filter(
        tactic => tactic.id === team.tacticId
      )[0];

      team.tactic = Object.assign({}, tactic);
      return team;
    });

    this.setTeamPosition(teams[1]);
    this.setState({ teams });
  }

  isItemDraggable(teamId) {
    const team = this.state.teams.filter(team => team.id === teamId)[0];
    return !team ? false : team.configurable;
  }

  handleDragStart = (event, teamId, playerId) => {
    if (!this.isItemDraggable(teamId)) {
      event.preventDefault();
      return;
    }

    event.target.style.opacity = "0.5";
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ playerId, teamId })
    );
  };

  handleDragEnter = (event, teamId) => {
    if (!this.isItemDraggable(teamId)) {
      event.preventDefault();
      return;
    }

    event.target.classList.add("drag-over");
  };

  handleDragLeave = (event, teamId) => {
    if (!this.isItemDraggable(teamId)) {
      event.preventDefault();
      return;
    }

    event.target.classList.remove("drag-over");
  };

  handleDragOver = (event, teamId) => {
    if (!this.isItemDraggable(teamId)) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  handleDrop = (event, teamId, positionId) => {
    const data = event.dataTransfer.getData("text/plain");

    if (!this.isItemDraggable(teamId) || !data) {
      return;
    }

    event.target.classList.remove("drag-over");
    event.target.classList.add("dropped");
    event.preventDefault();
    this.setPlayerPosition(JSON.parse(data), positionId);
  };

  handleDragEnd = event => {
    event.target.style.opacity = "1";
  };

  setPlayerPosition = (playerData, positionId) => {
    const team = this.state.teams.filter(
      team => team.id === playerData.teamId
    )[0];

    let previousPosition = null;

    // Reset any previous position
    team.tactic.positions.some(tacticPosition => {
      if (tacticPosition.playerId === playerData.playerId) {
        previousPosition = tacticPosition;
        tacticPosition.playerId = null;
        return true;
      }
    });

    team.tactic.positions.some(tacticPosition => {
      if (tacticPosition.id === positionId) {
        if (tacticPosition.playerId && previousPosition) {
          previousPosition.playerId = tacticPosition.playerId;
        }

        tacticPosition.playerId = playerData.playerId;
        return true;
      }
    });

    team.players.some(player => {
      if (player.id === playerData.playerId) {
        player.selected = true;
        return true;
      }
    });

    this.setState({
      team
    });
  };

  render() {
    return (
      <div className="container tactics-component">
        <Provider value={this.state}>
          <div className="col-2 players-list-container team-1-list">
            <TacticSelector
              tactics={this.state.tactics}
              team={this.state.teams[0]}
            />
            <PlayersList team={this.state.teams[0]} />
          </div>
          <div className="col-8 field-container">
            <Field />
          </div>
          <div className="col-2 players-list-container team-2-list">
            <TacticSelector
              tactics={this.state.tactics}
              team={this.state.teams[1]}
            />
            <PlayersList team={this.state.teams[1]} />
          </div>
        </Provider>
      </div>
    );
  }
}

export default Tactics;
