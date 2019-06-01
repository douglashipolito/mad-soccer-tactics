import React from "react";

const TacticsContext = React.createContext({
  teams: [],
  changePlayerPosition() {},
  handleDragStart() {},
  handleDragEnter() {},
  handleDragLeave() {},
  handleDragOver() {},
  handleDragEnd() {},
  handleDrop() {},
  handleTacticChange() {},
  tactics: []
});

export const Provider = TacticsContext.Provider;
export const Consumer = TacticsContext.Consumer;
