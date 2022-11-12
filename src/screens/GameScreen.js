import React from 'react';
import Field from '../components/Field';
import { GameContext } from '../contexts/gameContext';

class GameScreen extends React.Component {
  static contextType = GameContext;
  constructor(props) {
    super(props);
    this.state = {
      target: undefined,
    };
    this.selectAttack = this.selectAttack.bind(this);
  }

  componentDidUpdate() {
    this.context.checkEndGame();
  }

  // select attack
  selectAttack(e) {
    const square = e.target;
    const context = this.context;
    const number = square.dataset.number;
    if (
      square.classList.contains('square') &&
      !context[`hits_${context.turn}`].includes(number) &&
      !context[`misses_${context.turn}`].includes(number) &&
      !context.turnChange
    ) {
      document
        .querySelector('.square--target')
        ?.classList.remove('square--target');
      square.classList.add('square--target');
      this.setState({ target: number });
    }
  }

  render() {
    const {
      newGame,
      turn,
      turnEnd,
      turnChange,
      ships_1,
      hits_1,
      misses_1,
      ships_2,
      hits_2,
      misses_2,
      endTurn,
      startTurn,
      attack,
    } = this.context;

    // attack
    const attackSquare = () => {
      if (this.state.target) {
        attack(this.state.target);

        document
          .querySelector('.square--target')
          ?.classList.remove('square--target');
        this.setState({ target: undefined });
      }
    };

    return (
      <div className="game-screen">
        <button onClick={newGame}>Start</button>

        <h2>Player {turn}</h2>

        <div className="field-container">
          {!turnEnd && (
            <Field
              className={turn === 1 ? 'own' : 'enemy'}
              title={turn === 1 ? 'Your field' : 'Enemy field'}
              ships={turn === 1 && ships_1}
              hits={hits_2}
              misses={misses_2}
              onClick={turn === 2 ? this.selectAttack : undefined}
            />
          )}

          <div className="field__buttons">
            {!turnChange && <button onClick={attackSquare}>Attack</button>}
            {turnChange && !turnEnd && (
              <button onClick={endTurn}>End turn</button>
            )}
            {turnEnd && <button onClick={startTurn}>Start turn</button>}
          </div>

          {!turnEnd && (
            <Field
              className={turn === 2 ? 'own' : 'enemy'}
              title={turn === 2 ? 'Your field' : 'Enemy field'}
              ships={turn === 2 && ships_2}
              hits={hits_1}
              misses={misses_1}
              onClick={turn === 1 ? this.selectAttack : undefined}
            />
          )}
        </div>
      </div>
    );
  }
}

export default GameScreen;
