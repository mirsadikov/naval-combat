import React from 'react';

interface IProps {
  key: number;
  isHit: boolean | undefined;
  isMiss: boolean | undefined;
  isShip: boolean | undefined;
  number: number;
}

class Square extends React.Component<IProps> {
  render() {
    const classes: string[] = ['square'];
    if (this.props.isHit) classes.push('square--hits');
    if (this.props.isMiss) classes.push('square--misses');
    if (this.props.isShip) classes.push('square--ships');
    return <div className={classes.join(' ')} data-number={this.props.number}></div>;
  }
}

export default Square;
