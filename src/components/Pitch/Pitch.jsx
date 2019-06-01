import React from "react";
import "./Pitch.scss";

class Pitch extends React.Component {
  render() {
    return (
      <div className="football-pitch">
        {this.props.children}
        <div className="outline marking" />
        <div className="box left marking" />
        <div className="box-d left marking" />
        <div className="box left small marking" />
        <div className="box right marking" />
        <div className="box-d right marking" />
        <div className="box right small marking" />
        <div className="spot left marking" />
        <div className="spot right marking" />
        <div className="spot center marking" />
        <div className="center-line marking" />
        <div className="center-circle marking" />
        <div className="corner top left marking" />
        <div className="corner top right marking" />
        <div className="corner bottom left marking" />
        <div className="corner bottom right marking" />
        <div className="grass" />
      </div>
    );
  }
}

export default Pitch;
