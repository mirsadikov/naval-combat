import React from 'react';
import Field from './Field';

class WinScreen extends React.Component {
  render() {
    return (
      <div className="win-screen">
        <h2>Player {this.props.state.turn} wins!</h2>

        <div className="field-container">
          {!this.props.state.turnEnd && (
            <Field
              className="own"
              title="Player 1 field"
              ships={this.props.state.ships_1}
            />
          )}

          <div className="field__buttons">
            <button onClick={this.props.newGame}>New game</button>
          </div>

          {!this.props.state.turnEnd && (
            <Field
              className="own"
              title="Player 2 field"
              ships={this.props.state.ships_2}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WinScreen;
