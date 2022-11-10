import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        data-number={this.props.number}
      ></div>
    );
  }
}

export default Square;