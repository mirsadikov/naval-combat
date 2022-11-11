import React from 'react';
import Square from './Square';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
    this.currentField = React.createRef();
  }
  componentDidMount() {
    this.renderFields();
  }

  componentDidUpdate() {
    this.renderFields();
  }

  renderFields() {
    const field = this.currentField.current;
    const addClassLoop = (squares, className) => {
      squares.forEach((s) => {
        field
          .querySelector(`.square[data-number="${s}"]`)
          .classList.add(className);
      });
    };

    if (this.props.ships) {
      field.querySelectorAll('.square--ships').forEach((item) => {
        item.classList.remove('square--ships');
      });
      addClassLoop(this.props.ships, 'square--ships');
    }

    if (this.props.hits) addClassLoop(this.props.hits, 'square--hits');
    if (this.props.misses) addClassLoop(this.props.misses, 'square--misses');
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div
          className={`${this.props.className} field`}
          onClick={this.props.onClick}
          ref={this.currentField}
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
