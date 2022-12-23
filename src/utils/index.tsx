import { TileStates } from "../constants";

export const paintTile = (tileState: string, tileLetter: string) => {
  let keyboardKey = document.getElementById(tileLetter) as HTMLElement;

  if (
    !keyboardKey.dataset.state ||
    keyboardKey.dataset.state === TileStates.Absent ||
    (keyboardKey.dataset.state === TileStates.Present &&
      tileState === TileStates.Correct)
  )
    keyboardKey.dataset.state = tileState;
};

export const isLetter = (currLetter: string) => {
  return /^[a-z]{1}$/.test(currLetter);
};
