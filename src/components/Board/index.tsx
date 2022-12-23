import { useContext, useEffect } from "react";
import LetterTile from "../LetterTile";
import "./style.css";
import { GameContext, GameContextType } from "../../context/GameContext";
import toast from "react-hot-toast";

const Board = () => {
  const { tileColors, board, handleEvent, gameOptions } = useContext(
    GameContext
  ) as GameContextType;

  useEffect(() => {
    if (gameOptions.isOver) {
      window.removeEventListener("keydown", handleEvent);
      toast(gameOptions.toastMessage);
      return;
    }
    window.addEventListener("keydown", handleEvent);
  }, [gameOptions.isOver]);

  return (
    <div className="board">
      {board.map((row, rowNo) => {
        return (
          <div className="row" key={rowNo}>
            {row.map((letter, tileNo) => {
              return (
                <LetterTile
                  color={
                    tileColors.length >= rowNo &&
                    tileColors[rowNo]?.length >= tileNo
                      ? tileColors[rowNo][tileNo]
                      : ""
                  }
                  key={tileNo}
                  letter={letter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
