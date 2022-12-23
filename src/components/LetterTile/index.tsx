import { useEffect, useRef } from "react";
import "./style.css";
interface LetterTileProps {
  letter: String;
  color: String;
}

const LetterTile = ({ letter, color }: LetterTileProps) => {
  const tile = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(true);

  tile.current?.classList.remove("animate");

  if (letter === "") tile.current?.classList.remove("filled");

  useEffect(() => {
    if (!didMount.current && letter !== "") {
      tile.current?.classList.add("animate", "filled");
    }
    didMount.current = false;
  }, [letter]);

  return (
    <div className={`tile ${color}`} ref={tile}>
      {letter}
    </div>
  );
};

export default LetterTile;
