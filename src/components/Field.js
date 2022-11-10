import React from 'react';
import Square from './Square';

class Field extends React.Component {
  componentDidMount() {
    this.props.renderFields();
  }

  componentDidUpdate() {
    this.props.renderFields();
  }
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div
          className={`${this.props.className} field`}
          onClick={this.props.onClick}
        >
          <Square number={1} />
          <Square number={2} />
          <Square number={3} />
          <Square number={4} />
          <Square number={5} />
          <Square number={6} />
          <Square number={7} />
          <Square number={8} />
          <Square number={9} />
          <Square number={10} />
          <Square number={11} />
          <Square number={12} />
          <Square number={13} />
          <Square number={14} />
          <Square number={15} />
          <Square number={16} />
          <Square number={17} />
          <Square number={18} />
          <Square number={19} />
          <Square number={20} />
          <Square number={21} />
          <Square number={22} />
          <Square number={23} />
          <Square number={24} />
          <Square number={25} />
        </div>
      </div>
    );
  }
}

export default Field;
