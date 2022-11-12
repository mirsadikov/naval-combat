import React from 'react';
import Field from '../components/Field';
import { GameContext } from '../contexts/gameContext';

class WinScreen extends React.Component {
  static contextType = GameContext;
  render() {
    const { turn, ships_1, turnEnd, newGame, ships_2 } = this.context;
    return (
      <div className="win-screen">
        <h2>Player {turn} wins!</h2>

        <div className="field-container">
          {!turnEnd && (
            <Field className="own" title="Player 1 field" ships={ships_1} />
          )}

          <div className="field__buttons">
            <button onClick={newGame}>New game</button>
          </div>

          {!turnEnd && (
            <Field className="own" title="Player 2 field" ships={ships_2} />
          )}
        </div>
      </div>
    );
  }
}

export default WinScreen;
