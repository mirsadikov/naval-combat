import './App.css';
import React from 'react';
import MainMenu from './screens/MainMenu';
import ShipsArrangementScreen from './screens/ShipsArrangementScreen';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';
import { GameContext } from './contexts/gameContext';

class App extends React.Component {
  static contextType = GameContext;

  render() {
    const { step } = this.context;
    return (
      <div className="App">
        {step === 0 && <MainMenu />}
        {step === 1 && <ShipsArrangementScreen />}
        {step === 2 && <GameScreen />}
        {step === 3 && <WinScreen />}
      </div>
    );
  }
}

export default App;
