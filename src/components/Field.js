import React from 'react';
import Square from './Square';

class Field extends React.Component {
  render() {
    return (
      <div
        className={`${this.props.className} field`}
        onClick={this.props.onClick}
        ref={this.currentField}
      >
        {new Array(25).fill(0).map((_, index) => {
          console.log(this.props.ships);
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
