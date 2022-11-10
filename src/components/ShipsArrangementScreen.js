import React from 'react';
import Field from './Field';

class ShipsArrangementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
    this.placeShips = this.placeShips.bind(this);
    this.confirmShips = this.confirmShips.bind(this);

    this.state = {
      selectedShip: [],
    };
  }

  renderFields() {
    document.querySelectorAll('.square--selected').forEach((item) => {
      item.classList.remove('square--selected');
    });
    this.state.selectedShip.forEach((square) => {
      document
        .querySelector(`.square[data-number="${square}"]`)
        .classList.add('square--selected');
    });
  }

  placeShips(e) {
    const square = e.target;
    if (square.classList.contains('square')) {
      const number = square.dataset.number;

      if (this.state.selectedShip.includes(number)) {
        this.setState({
          selectedShip: this.state.selectedShip.filter(
            (item) => item !== number,
          ),
        });
      } else if (this.state.selectedShip.length < 8) {
        this.setState((state) => {
          return { selectedShip: [...state.selectedShip, number] };
        });
      }
    }
  }

  confirmShips() {
    if (this.state.selectedShip.length === 8) {
      this.props.confirmSquare(this.state.selectedShip);
      this.setState({ selectedShip: [] });
    }
  }

  render() {
    return (
      <div className="ships-arrangement-screen">
        <h1>Ships arrangement</h1>
        <button onClick={this.confirmShips}>Confirm</button>
        <div className="field-container">
          <Field
            className="select"
            title={`Player ${this.props.turn} field`}
            onClick={this.placeShips}
            renderFields={this.renderFields}
          />
        </div>
      </div>
    );
  }
}

export default ShipsArrangementScreen;
