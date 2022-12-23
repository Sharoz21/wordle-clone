import { useContext } from "react";
import { GameContext, GameContextType } from "../../context/GameContext";
import "./style.css";
interface KeyProps {
  letter: string;
}

const Key = ({ letter }: KeyProps) => {
  const { handleEvent, gameOptions } = useContext(
    GameContext
  ) as GameContextType;
  return (
    <li
      className="key"
      onClick={gameOptions.isOver ? undefined : handleEvent}
      id={letter}
    >
      {letter}
    </li>
  );
};

export default Key;
