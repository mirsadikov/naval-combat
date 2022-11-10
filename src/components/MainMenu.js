import React from 'react';

class MainMenu extends React.Component {
  render() {
    return (
      <div className="main-menu">
        <h1 className="main-menu__title">Naval Combat</h1>
        <button className="main-menu__button" onClick={this.props.startGame}>
          Start
        </button>
      </div>
    );
  }
}

export default MainMenu;