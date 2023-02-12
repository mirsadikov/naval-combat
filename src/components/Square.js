import React from 'react';

class Square extends React.Component {
  render() {
    const classes = ['square'];
    if (this.props.isHit) classes.push('square--hits');
    if (this.props.isMiss) classes.push('square--misses');
    if (this.props.isShip) classes.push('square--ships');
    return <div className={classes.join(' ')} data-number={this.props.number}></div>;
  }
}

export default Square;
