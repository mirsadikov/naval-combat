import React from 'react';
import Square from './Square';

interface IProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className: string;
  hits?: number[];
  misses?: number[];
  ships?: number[];
}

class Field extends React.Component<IProps> {
  render() {
    return (
      <div className={`${this.props.className} field`} onClick={this.props.onClick}>
        {new Array(25).fill(0).map((_, index) => {
          return (
            <Square
              key={index}
              number={index + 1}
              isHit={this.props.hits?.includes(index + 1)}
              isMiss={this.props.misses?.includes(index + 1)}
              isShip={this.props.ships?.includes(index + 1)}
            />
          );
        })}
      </div>
    );
  }
}

export default Field;
