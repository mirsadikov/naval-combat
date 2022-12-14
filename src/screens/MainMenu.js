import React from 'react';
import { GameContext } from '../contexts/gameContext';

class MainMenu extends React.Component {
  static contextType = GameContext;

  render() {
    const { newGame } = this.context;
    return (
      <div className="main-menu">
        <h1 className="main-menu__title">Naval Combat</h1>
        <button className="main-menu__button" onClick={newGame}>
          Start
        </button>
      </div>
    );
  }
}

export default MainMenu;
