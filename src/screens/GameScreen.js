import React from 'react';
import Field from '../components/Field';

class GameScreen extends React.Component {
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
              ships={this.props.state.turn === 1 && this.props.state.ships_1}
              hits={this.props.state.hits_2}
              misses={this.props.state.misses_2}
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
              ships={this.props.state.turn === 2 && this.props.state.ships_2}
              hits={this.props.state.hits_1}
              misses={this.props.state.misses_1}
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
