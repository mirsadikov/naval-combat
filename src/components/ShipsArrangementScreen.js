import React from 'react';
import Field from './Field';

class ShipsArrangementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
  }

  renderFields() {
    document.querySelectorAll('.square--selected').forEach((item) => {
      item.classList.remove('square--selected');
    });
    this.props.ships?.forEach((square) => {
      document
        .querySelector(`.square[data-number="${square}"]`)
        .classList.add('square--selected');
    });
  }

  render() {
    return (
      <div className="ships-arrangement-screen">
        <h1>Ships arrangement</h1>
        <button onClick={this.props.confirmSquare}>Confirm</button>
        <div className="field-container">
          <Field
            className="select"
            title={`Player ${this.props.state.turn} field`}
            onClick={this.props.onClick}
            renderFields={this.renderFields}
          />
        </div>
      </div>
    );
  }
}

export default ShipsArrangementScreen;
