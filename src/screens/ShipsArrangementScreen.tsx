import React from 'react';
import Field from '../components/Field';
import { GameContext } from '../contexts/gameContext';

interface IProps {
  className?: string;
}

interface IState {
  selectedShip: number[];
}

class ShipsArrangementScreen extends React.Component<IProps, IState> {
  static contextType = GameContext;

  constructor(props: IProps) {
    super(props);
    this.placeShips = this.placeShips.bind(this);
    this.confirmShips = this.confirmShips.bind(this);

    this.state = {
      selectedShip: [],
    };
  }

  context!: React.ContextType<typeof GameContext>;

  placeShips(e: React.MouseEvent<HTMLDivElement>) {
    const square = e.target as HTMLDivElement;
    if (square.classList.contains('square') && square.dataset.number) {
      const number = parseInt(square.dataset.number);

      if (this.state.selectedShip.includes(number)) {
        this.setState({
          selectedShip: this.state.selectedShip.filter((item) => item !== number),
        });
        return;
      }

      if (this.state.selectedShip.length < 8) {
        this.setState((state) => {
          return { selectedShip: [...state.selectedShip, number] };
        });

        return;
      }
    }
  }

  confirmShips() {
    if (this.state.selectedShip.length === 8) {
      this.context.confirmShips(this.state.selectedShip);
      this.setState({ selectedShip: [] });
    }
  }

  render() {
    const { turn } = this.context;

    return (
      <div className="ships-arrangement">
        <h2 className="ships-arrangement__title">Ships arrangement</h2>
        <div className="ships-arrangement__field">
          <h3 className="ships-arrangement__subtitle">{`Player ${turn} field`}</h3>
          <Field className="select" onClick={this.placeShips} ships={this.state.selectedShip} />
          <button className="ships-arrangement__button" onClick={this.confirmShips}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default ShipsArrangementScreen;
