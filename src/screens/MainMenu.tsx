import React from 'react';
import { GameContext, IGameContext } from '../contexts/gameContext';

class MainMenu extends React.Component {
  static contextType: React.Context<IGameContext> = GameContext;

  render() {
    const { newGame } = this.context as IGameContext;
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
