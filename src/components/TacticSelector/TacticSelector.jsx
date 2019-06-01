import React from "react";
import { Consumer } from "../Tactics/TacticsContext";

import "./TacticSelector.scss";

class TacticSelector extends React.Component {
  render() {
    if (!this.props.team) {
      return null;
    }

    return (
      <Consumer>
        {context => (
          <div className="tactice-selector-component">
            <form>
              <label htmlFor={`tactic-selector-${this.props.team.id}`}>
                <span>Tactic</span>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  onChange={event =>
                    context.handleTacticChange(event, this.props.team.id)
                  }
                >
                  {this.props.tactics.map(tactic => (
                    <option key={tactic.id} value={tactic.id}>
                      {tactic.name}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default TacticSelector;
