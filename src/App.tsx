import './App.css';
import React from 'react';
import MainMenu from './screens/MainMenu';
import ShipsArrangementScreen from './screens/ShipsArrangementScreen';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';
import { GameContext, GAME_STEPS, IGameContext } from './contexts/gameContext';

class App extends React.Component {
  static contextType = GameContext;

  render() {
    const { step } = this.context as IGameContext;
    return (
      <div className="App">
        {step === GAME_STEPS.MAIN_MENU && <MainMenu />}
        {step === GAME_STEPS.SHIP_ARRANGEMENT && <ShipsArrangementScreen />}
        {step === GAME_STEPS.GAME && <GameScreen />}
        {step === GAME_STEPS.WIN_SCREEN && <WinScreen />}
      </div>
    );
  }
}

export default App;
