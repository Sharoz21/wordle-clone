import { cloneDeep } from "lodash";
import { createContext, useCallback, useRef, useState } from "react";
import {
  KeyEvents,
  TileStates,
  ToastMessages,
  initialBoard,
} from "../constants";
import { isLetter, paintTile } from "../utils";
import useStateRef from "../hooks/useStateEffect";
import useRandomWord from "../hooks/useRandomWord";

interface IGameOptions {
  isOver: boolean;
  toastMessage: string;
}

export interface GameContextType {
  board: String[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  tileColors: String[][];
  setTileColors: React.Dispatch<React.SetStateAction<string[][]>>;
  gameOptions: IGameOptions;
  handleEvent: (e: KeyboardEvent | React.MouseEvent<HTMLElement>) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface IGameContextProvider {
  children: React.ReactNode;
}

const GameContextProvider = ({ children }: IGameContextProvider) => {
  const [board, setBoard, boardRef] = useStateRef(initialBoard);
  const answer = useRandomWord();
  const [tileColors, setTileColors] = useState<string[][]>([]);
  const [gameOptions, setGameOptions] = useState<IGameOptions>({
    isOver: false,
    toastMessage: "",
  });

  const col = useRef(0);
  const row = useRef(0);
  const attempt = useRef("");

  let isAnsCorrect = true;
  const ansLength = 5;

  const addTileStatus = () => {
    isAnsCorrect = true;

    let rowStatus = Array(ansLength)
      .fill("")
      .map((_, index) => {
        let tileState = "";

        if (answer.current[index] === attempt.current[index]) {
          tileState = TileStates.Correct;
        } else if (answer.current.includes(attempt.current[index])) {
          tileState = TileStates.Present;
        } else {
          tileState = TileStates.Absent;
        }

        if (tileState !== TileStates.Correct) isAnsCorrect = false;

        paintTile(tileState, attempt.current[index]);
        return tileState;
      });

    setTileColors((prev) => [...prev, rowStatus]);
  };

  const handleBackspace = () => {
    let newBoard = cloneDeep(boardRef.current);

    if (newBoard![row.current][col.current] === "") col.current--;

    newBoard![row.current][col.current] = "";
    attempt.current = attempt.current.slice(0, -1);
    setBoard(newBoard!);
  };

  const handleEvent = useCallback(
    (e: KeyboardEvent | React.MouseEvent<HTMLElement>) => {
      let currKey =
        (e as KeyboardEvent).key ||
        ((e as React.MouseEvent<HTMLDivElement>).currentTarget.id as string);

      if (currKey === KeyEvents.Enter) {
        if (attempt.current.length < ansLength) {
          return;
        }

        addTileStatus();

        if (isAnsCorrect || row.current === ansLength) {
          const toastMessage = isAnsCorrect
            ? ToastMessages.win
            : ToastMessages.lose(answer.current);

          setGameOptions({
            isOver: true,
            toastMessage,
          });
        }

        col.current = 0;
        row.current++;
        attempt.current = "";
      } else if (currKey === KeyEvents.Backspace) {
        if (col.current === 0) return;
        handleBackspace();
      } else if (isLetter(currKey)) {
        if (attempt.current.length === ansLength) return;

        const newBoard = cloneDeep(boardRef.current);
        newBoard![row.current][col.current] = currKey;
        attempt.current += currKey;

        setBoard(newBoard!);

        if (col.current < ansLength - 1) col.current++;
      }
    },
    []
  );

  return (
    <GameContext.Provider
      value={{
        setBoard,
        setTileColors,
        handleEvent,
        tileColors,
        board,
        gameOptions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
