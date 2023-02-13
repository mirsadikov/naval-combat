import React from 'react';
import { useState, createContext, SetStateAction } from 'react';

enum GAME_STEPS {
  MAIN_MENU,
  SHIP_ARRANGEMENT,
  GAME,
  WIN_SCREEN,
}

enum GAME_TURNS {
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

interface IProps {
  children: React.ReactNode;
}

interface IAttackHandler {
  ship: number[];
  target: number;
  hits: number[];
  misses: number[];
  setHits: React.Dispatch<SetStateAction<number[]>>;
  setMisses: React.Dispatch<SetStateAction<number[]>>;
}

interface IGameContext {
  step: GAME_STEPS;
  turn: GAME_TURNS | undefined;
  ships_1: number[];
  hits_1: number[];
  misses_1: number[];
  ships_2: number[];
  hits_2: number[];
  misses_2: number[];
  turnChange: boolean;
  turnEnd: boolean;
  newGame: () => void;
  reset: () => void;
  goMain: () => void;
  confirmShips: (ships: number[]) => void;
  attack: (target: number) => void;
  endTurn: () => void;
  startTurn: () => void;
  checkEndGame: () => void;
}

const GameContext = createContext({} as IGameContext);

const GameProvider: React.FC<IProps> = ({ children }) => {
  const [step, setStep] = useState(GAME_STEPS.MAIN_MENU);
  const [turn, setTurn] = useState<GAME_TURNS | undefined>(undefined);
  const [ships_1, setShips_1] = useState<number[]>([]);
  const [hits_1, setHits_1] = useState<number[]>([]);
  const [misses_1, setMisses_1] = useState<number[]>([]);
  const [ships_2, setShips_2] = useState<number[]>([]);
  const [hits_2, setHits_2] = useState<number[]>([]);
  const [misses_2, setMisses_2] = useState<number[]>([]);
  const [turnChange, setTurnChange] = useState<boolean>(false);
  const [turnEnd, setTurnEnd] = useState(false);

  const reset = (): void => {
    setStep(GAME_STEPS.MAIN_MENU);
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

  const newGame = (): void => {
    reset();
    setStep(GAME_STEPS.SHIP_ARRANGEMENT);
    setTurn(GAME_TURNS.PLAYER_1);
  };

  const confirmShips = (ships: number[]): void => {
    if (turn === GAME_TURNS.PLAYER_1) {
      setTurn(GAME_TURNS.PLAYER_2);
      setShips_1(ships);
      return;
    }
    if (turn === GAME_TURNS.PLAYER_2) {
      setStep(GAME_STEPS.GAME);
      setShips_2(ships);
      setTurn(GAME_TURNS.PLAYER_1);
      setTurnChange(true);
      setTurnEnd(true);
    }
  };

  const attackHandler = ({
    ship,
    target,
    hits,
    misses,
    setHits,
    setMisses,
  }: IAttackHandler): void => {
    if (ship.includes(target)) {
      setHits([...hits, target]);
    } else {
      setMisses([...misses, target]);
      setTurnChange(true);
    }
  };

  const attack = (target: number): void => {
    if (turn === GAME_TURNS.PLAYER_1) {
      attackHandler({
        ship: ships_2,
        target,
        hits: hits_1,
        misses: misses_1,
        setHits: setHits_1,
        setMisses: setMisses_1,
      });

      return;
    }

    if (turn === GAME_TURNS.PLAYER_2) {
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

  const endTurn = (): void => {
    if (turnChange) {
      setTurnEnd(true);
      setTurn(turn === GAME_TURNS.PLAYER_1 ? GAME_TURNS.PLAYER_2 : GAME_TURNS.PLAYER_1);
    }
  };

  const startTurn = (): void => {
    if (turnEnd) {
      setTurnChange(false);
      setTurnEnd(false);
    }
  };

  const checkEndGame = (): void => {
    if (hits_1.length === 8 || hits_2.length === 8) {
      setStep(GAME_STEPS.WIN_SCREEN);
    }
  };

  const goMain = (): void => {
    reset();
    setStep(GAME_STEPS.MAIN_MENU);
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

export { GameContext, GAME_STEPS, GAME_TURNS, IGameContext };
