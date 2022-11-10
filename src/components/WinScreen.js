import React from 'react';
import Field from './Field';

class WinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
  }

  renderFields() {
    this.props.state.ships_1.forEach((square) => {
      document
        .querySelector(`.player1 .square[data-number="${square}"]`)
        .classList.add('square--ships');
    });
    this.props.state.ships_2.forEach((square) => {
      document
        .querySelector(`.player2 .square[data-number="${square}"]`)
        .classList.add('square--ships');
    });
  }

  render() {
    return (
      <div className="win-screen">
        <h2>Player {this.props.state.turn} wins!</h2>

        <div className="field-container">
          {!this.props.state.turnEnd && (
            <Field
              className="own player1"
              title="Player 1 field"
              renderFields={this.renderFields}
            />
          )}

          <div className="field__buttons">
            <button onClick={this.props.newGame}>New game</button>
          </div>

          {!this.props.state.turnEnd && (
            <Field
              className="own player2"
              title="Player 2 field"
              renderFields={this.renderFields}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WinScreen;
