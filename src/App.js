import './App.css';
import React from 'react';
import MainMenu from './screens/MainMenu';
import ShipsArrangementScreen from './screens/ShipsArrangementScreen';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';

const initialState = {
  step: 0,
  turn: undefined,
  ships_1: [],
  hits_1: [],
  misses_1: [],
  ships_2: [],
  hits_2: [],
  misses_2: [],
  target: undefined,
  turnChange: false,
  turnEnd: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.confirmSquare = this.confirmSquare.bind(this);
    this.selectAttack = this.selectAttack.bind(this);
    this.attack = this.attack.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.startTurn = this.startTurn.bind(this);
    this.newGame = this.newGame.bind(this);
    this.checkEndGame = this.checkEndGame.bind(this);

    this.state = initialState;
  }

  // start game
  startGame() {
    this.setState({ step: 1, turn: 1 });
  }

  // new game
  newGame() {
    this.setState({ ...initialState, step: 1, turn: 1 });
  }

  // confirm squares
  confirmSquare(ships) {
    if (this.state.turn === 1) {
      this.setState({ turn: 2, ships_1: ships });
    } else if (this.state.turn === 2) {
      this.setState({
        step: 2,
        ships_2: ships,
        turn: 1,
        turnChange: true,
        turnEnd: true,
      });
    }
  }

  // select attack
  selectAttack(e) {
    const square = e.target;
    const number = square.dataset.number;
    if (
      square.classList.contains('square') &&
      !this.state[`hits_${this.state.turn}`].includes(number) &&
      !this.state[`misses_${this.state.turn}`].includes(number) &&
      !this.state.turnChange
    ) {
      document
        .querySelector('.square--target')
        ?.classList.remove('square--target');
      square.classList.add('square--target');
      this.setState({ target: number });
    }
  }

  // attack
  attack() {
    const target = this.state.target;
    const ships = `ships_${this.state.turn === 1 ? 2 : 1}`;
    const hits = `hits_${this.state.turn === 2 ? 2 : 1}`;
    const misses = `misses_${this.state.turn === 2 ? 2 : 1}`;

    if (target) {
      if (this.state[ships].includes(target)) {
        this.setState((state) => {
          return {
            [hits]: [...state[hits], target],
          };
        }, this.checkEndGame);
      } else {
        this.setState((state) => {
          return { [misses]: [...state[misses], target], turnChange: true };
        });
      }

      document
        .querySelector('.square--target')
        ?.classList.remove('square--target');
      this.setState({ target: undefined });
    }
  }

  // end turn
  endTurn() {
    if (this.state.turnChange)
      this.setState({
        turnEnd: true,
        turn: this.state.turn === 1 ? 2 : 1,
      });
  }

  // start turn
  startTurn() {
    this.setState({ turnEnd: false, turnChange: false });
  }

  // end game
  checkEndGame() {
    if (this.state.hits_1.length === 8 || this.state.hits_2.length === 8) {
      this.setState({ step: 3 });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.step === 0 && <MainMenu startGame={this.startGame} />}
        {this.state.step === 1 && (
          <ShipsArrangementScreen
            confirmSquare={this.confirmSquare}
            turn={this.state.turn}
          />
        )}
        {this.state.step === 2 && (
          <GameScreen
            state={this.state}
            newGame={this.newGame}
            selectAttack={this.selectAttack}
            attack={this.attack}
            startTurn={this.startTurn}
            endTurn={this.endTurn}
          />
        )}
        {this.state.step === 3 && (
          <WinScreen newGame={this.newGame} state={this.state} />
        )}
      </div>
    );
  }
}

export default App;
