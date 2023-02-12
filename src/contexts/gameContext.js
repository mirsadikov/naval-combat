import { useState, createContext } from 'react';
import { GAME, MAIN_MENU, SHIP_ARRANGEMENT, WIN_SCREEN } from './gameContext.constants';

const GameContext = createContext();

const GameProvider = function ({ children }) {
  const [step, setStep] = useState(MAIN_MENU);
  const [turn, setTurn] = useState(undefined);
  const [ships_1, setShips_1] = useState([]);
  const [hits_1, setHits_1] = useState([]);
  const [misses_1, setMisses_1] = useState([]);
  const [ships_2, setShips_2] = useState([]);
  const [hits_2, setHits_2] = useState([]);
  const [misses_2, setMisses_2] = useState([]);
  const [turnChange, setTurnChange] = useState(false);
  const [turnEnd, setTurnEnd] = useState(false);

  const reset = () => {
    setStep(MAIN_MENU);
    setTurn(undefined);
    setShips_1([]);
    setHits_1([]);
    setMisses_1([]);
    setShips_2([]);
    setHits_2([]);
    setMisses_2([]);
    setTurnChange(false);
    setTurnEnd(false);
  };

  const newGame = () => {
    reset();
    setStep(SHIP_ARRANGEMENT);
    setTurn(1);
  };

  const confirmShips = (ships) => {
    if (turn === 1) {
      setTurn(2);
      setShips_1(ships);
      return;
    }
    if (turn === 2) {
      setStep(GAME);
      setShips_2(ships);
      setTurn(1);
      setTurnChange(true);
      setTurnEnd(true);
    }
  };

  const attackHandler = ({ ship, target, hits, misses, setHits, setMisses }) => {
    if (ship.includes(target)) {
      setHits([...hits, target]);
    } else {
      setMisses([...misses, target]);
      setTurnChange(true);
    }
    return;
  };

  const attack = (target) => {
    if (turn === 1) {
      attackHandler({
        ship: ships_2,
        target,
        hits: hits_1,
        misses: misses_1,
        setHits: setHits_1,
        setMisses: setMisses_1,
      });
    }

    if (turn === 2) {
      attackHandler({
        ship: ships_1,
        target,
        hits: hits_2,
        misses: misses_2,
        setHits: setHits_2,
        setMisses: setMisses_2,
      });
    }
  };

  const endTurn = () => {
    if (turnChange) {
      setTurnEnd(true);
      setTurn(turn === 1 ? 2 : 1);
    }
  };

  const startTurn = () => {
    if (turnEnd) {
      setTurnChange(false);
      setTurnEnd(false);
    }
  };

  const checkEndGame = () => {
    if (hits_1.length === 8 || hits_2.length === 8) {
      setStep(WIN_SCREEN);
    }
  };

  const goMain = () => {
    reset();
    setStep(MAIN_MENU);
  };

  return (
    <GameContext.Provider
      value={{
        step,
        turn,
        ships_1,
        hits_1,
        misses_1,
        ships_2,
        hits_2,
        misses_2,
        turnChange,
        turnEnd,
        newGame,
        reset,
        goMain,
        confirmShips,
        attack,
        endTurn,
        startTurn,
        checkEndGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export { GameContext };
