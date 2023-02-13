import React from 'react';
import Field from '../components/Field';
import { GameContext, GAME_TURNS } from '../contexts/gameContext';

interface IProps {
  className?: string;
}

interface IState {
  selectedSquare: HTMLDivElement | undefined;
  targetNumber: number | undefined;
}

class GameScreen extends React.Component<IProps, IState> {
  static contextType = GameContext;
  context!: React.ContextType<typeof GameContext>;

  constructor(props: IProps) {
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
  selectAttack(e: React.MouseEvent<HTMLDivElement>) {
    const square = e.target as HTMLDivElement;
    const context = this.context;
    if (!square.dataset.number) return;
    const number = parseInt(square.dataset.number);

    if (
      square.classList.contains('square') &&
      context.turn &&
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
        this.state.selectedSquare?.classList.remove('square--target');
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
              <h3>{turn === GAME_TURNS.PLAYER_1 ? 'Your field' : 'Enemy field'}</h3>
              <Field
                className={turn === GAME_TURNS.PLAYER_1 ? 'own' : 'enemy'}
                ships={turn === GAME_TURNS.PLAYER_1 ? ships_1 : undefined}
                hits={hits_2}
                misses={misses_2}
                onClick={turn === GAME_TURNS.PLAYER_2 ? this.selectAttack : undefined}
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
                ships={turn === 2 ? ships_2 : undefined}
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
