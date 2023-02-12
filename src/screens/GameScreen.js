import React from 'react';
import Field from '../components/Field';
import { GameContext } from '../contexts/gameContext';

class GameScreen extends React.Component {
  static contextType = GameContext;
  constructor(props) {
    super(props);
    this.state = {
      targetNumber: undefined,
      selectedSquare: undefined,
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
    const number = parseInt(square.dataset.number);
    if (
      square.classList.contains('square') &&
      !context[`hits_${context.turn}`].includes(number) &&
      !context[`misses_${context.turn}`].includes(number) &&
      !context.turnChange
    ) {
      this.state.selectedSquare?.classList.remove('square--target');
      square.classList.add('square--target');
      this.setState({ targetNumber: number, selectedSquare: square });
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
      if (this.state.targetNumber) {
        attack(this.state.targetNumber);

        // remove target
        this.state.selectedSquare.classList.remove('square--target');
        this.setState({ targetNumber: undefined });
      }
    };

    return (
      <div className="game-screen">
        <div className="game-screen__header">
          <button className="game-screen__btn" onClick={newGame}>
            New game
          </button>
          <h2 className="game-screen__title">Player {turn}</h2>
        </div>

        <div className="game-screen__fields">
          {!turnEnd && (
            <div className="game-screen__field">
              <h3>{turn === 1 ? 'Your field' : 'Enemy field'}</h3>
              <Field
                className={turn === 1 ? 'own' : 'enemy'}
                ships={turn === 1 ? ships_1 : null}
                hits={hits_2}
                misses={misses_2}
                onClick={turn === 2 ? this.selectAttack : undefined}
              />
            </div>
          )}

          <div className="game-screen__field-btns">
            {!turnChange && <button onClick={attackSquare}>Attack</button>}
            {turnChange && !turnEnd && <button onClick={endTurn}>End turn</button>}
            {turnEnd && <button onClick={startTurn}>Start turn</button>}
          </div>

          {!turnEnd && (
            <div className="game-screen__field">
              <h3>{turn === 2 ? 'Your field' : 'Enemy field'}</h3>
              <Field
                className={turn === 2 ? 'own' : 'enemy'}
                ships={turn === 2 ? ships_2 : null}
                hits={hits_1}
                misses={misses_1}
                onClick={turn === 1 ? this.selectAttack : undefined}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GameScreen;
