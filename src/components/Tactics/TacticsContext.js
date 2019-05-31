import React from "react";

const TacticsContext = React.createContext({
  teams: [],
  positionedPlayers: [],
  changePlayerPosition() {},
  handleDragStart() {},
  handleDragOver() {},
  handleDrop() {},
  tactics: [],
  selectedTactic: {}
});

export const Provider = TacticsContext.Provider;
export const Consumer = TacticsContext.Consumer;
