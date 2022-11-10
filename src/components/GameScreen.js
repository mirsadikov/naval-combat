import React from 'react';
import Field from './Field';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderOwn = this.renderOwn.bind(this);
    this.renderEnemy = this.renderEnemy.bind(this);
  }

  renderOwn() {
    this.props.state[`ships_${this.props.state.turn}`].forEach((square) => {
      document
        .querySelector(`.own .square[data-number="${square}"]`)
        .classList.add('square--ships');
    });
    this.props.state[`hits_${this.props.state.turn === 1 ? 2 : 1}`].forEach(
      (square) => {
        document
          .querySelector(`.own .square[data-number="${square}"]`)
          .classList.add('square--hits');
      },
    );
    this.props.state[`misses_${this.props.state.turn === 1 ? 2 : 1}`].forEach(
      (square) => {
        document
          .querySelector(`.own .square[data-number="${square}"]`)
          .classList.add('square--misses');
      },
    );
  }

  renderEnemy() {
    this.props.state[`hits_${this.props.state.turn}`].forEach((square) => {
      document
        .querySelector(`.enemy .square[data-number="${square}"]`)
        .classList.add('square--hits');
    });
    this.props.state[`misses_${this.props.state.turn}`].forEach((square) => {
      document
        .querySelector(`.enemy .square[data-number="${square}"]`)
        .classList.add('square--misses');
    });
  }

  render() {
    return (
      <div className="game-screen">
        <button onClick={this.props.newGame}>Start</button>

        <h2>Player {this.props.state.turn}</h2>

        <div className="field-container">
          {!this.props.state.turnEnd && (
            <Field
              className={this.props.state.turn === 1 ? 'own' : 'enemy'}
              title={this.props.state.turn === 1 ? 'Your field' : 'Enemy field'}
              renderFields={
                this.props.state.turn === 1 ? this.renderOwn : this.renderEnemy
              }
              onClick={
                this.props.state.turn === 2
                  ? this.props.selectAttack
                  : undefined
              }
            />
          )}

          <div className="field__buttons">
            {!this.props.state.turnChange && (
              <button onClick={this.props.attack}>Attack</button>
            )}
            {this.props.state.turnChange && !this.props.state.turnEnd && (
              <button onClick={this.props.endTurn}>End turn</button>
            )}
            {this.props.state.turnEnd && (
              <button onClick={this.props.startTurn}>Start turn</button>
            )}
          </div>

          {!this.props.state.turnEnd && (
            <Field
              className={this.props.state.turn === 2 ? 'own' : 'enemy'}
              title={this.props.state.turn === 2 ? 'Your field' : 'Enemy field'}
              renderFields={
                this.props.state.turn === 2 ? this.renderOwn : this.renderEnemy
              }
              onClick={
                this.props.state.turn === 1
                  ? this.props.selectAttack
                  : undefined
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default GameScreen;
