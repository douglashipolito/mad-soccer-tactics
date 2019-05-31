import React from "react";
import { Provider } from "./TacticsContext";
import PlayersList from "../PlayersList";
import Field from "../Field";
import teamsData from "../../../data/teams.json";
import tacticsData from "../../../data/tactics.json";

class Tatics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: teamsData,
      positionedPlayers: [
        {
          playerId: "t1.3",
          positionId: "tactic1.2"
        },
        {
          playerId: "t1.2",
          positionId: "tactic1.4"
        }
      ],
      changePlayerPosition: this.changePlayerPosition,
      handleDragStart: this.handleDragStart,
      handleDragOver: this.handleDragOver,
      handleDrop: this.handleDrop,
      tactics: tacticsData,
      selectedTactic: tacticsData[0]
    };
  }

  handleDragStart = (event, player, teamId) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ player, teamId })
    );
  };

  handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  handleDrop = (event, position) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    console.log(position);
  };

  changePlayerPosition = player => {};

  render() {
    return (
      <div className="container">
        <Provider value={this.state}>
          <div className="col-1 players-list-container">
            <PlayersList />
          </div>
          <div className="col-11 field-container">
            <Field />
          </div>
        </Provider>
      </div>
    );
  }
}

export default Tatics;
