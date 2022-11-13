import { useState, createContext } from 'react';

const GameContext = createContext();

const GameProvider = function ({ children }) {
  const [step, setStep] = useState(0);
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
    setStep(0);
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
    setStep(1);
    setTurn(1);
  };

  const confirmShips = (ships) => {
    if (turn === 1) {
      setTurn(2);
      setShips_1(ships);
    } else if (turn === 2) {
      setStep(2);
      setShips_2(ships);
      setTurn(1);
      setTurnChange(true);
      setTurnEnd(true);
    }
  };

  const attack = (target) => {
    if (turn === 1) {
      if (ships_2.includes(target)) {
        setHits_1([...hits_1, target]);
      } else {
        setMisses_1([...misses_1, target]);
        setTurnChange(true);
      }
    } else if (turn === 2) {
      if (ships_1.includes(target)) {
        setHits_2([...hits_2, target]);
      } else {
        setMisses_2([...misses_2, target]);
        setTurnChange(true);
      }
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
      setStep(3);
    }
  };

  const goMain = () => {
    reset();
    setStep(0);
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
