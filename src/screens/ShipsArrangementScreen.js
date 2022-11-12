import React from 'react';
import Field from '../components/Field';

class ShipsArrangementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.placeShips = this.placeShips.bind(this);
    this.confirmShips = this.confirmShips.bind(this);

    this.state = {
      selectedShip: [],
    };
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
            ships={this.state.selectedShip}
          />
        </div>
      </div>
    );
  }
}

export default ShipsArrangementScreen;
