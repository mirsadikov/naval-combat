import React from 'react';
import Field from '../components/Field';
import { GameContext, IGameContext } from '../contexts/gameContext';

class WinScreen extends React.Component {
  static contextType = GameContext;

  render() {
    const { turn, ships_1, turnEnd, ships_2, hits_1, hits_2, goMain, newGame } = this
      .context as IGameContext;

    return (
      <div className="win-screen">
        <div className="win-screen__header">
          <h2 className="win-screen__title">Player {turn} wins!</h2>
        </div>

        <div className="win-screen__fields">
          {!turnEnd && (
            <div className="win-screen__field">
              <h3>Player 1 field</h3>
              <Field className="own" ships={ships_1} hits={hits_2} />
            </div>
          )}

          <div className="win-screen__field-btns">
            <button onClick={newGame}>New game</button>
            <button onClick={goMain}>Main menu</button>
          </div>

          {!turnEnd && (
            <div className="win-screen__field">
              <h3>Player 2 field</h3>
              <Field className="own" ships={ships_2} hits={hits_1} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WinScreen;
