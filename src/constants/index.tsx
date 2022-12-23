const TileStates = {
  Correct: "correct",
  Present: "present",
  Absent: "absent",
};

const KeyEvents = {
  Enter: "Enter",
  Backspace: "Backspace",
};

const ToastMessages = {
  win: "You have guessed it right :)",
  lose: (word: string) => `The correct word was ${word} :(`,
};

const initialBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export { TileStates, KeyEvents, initialBoard, ToastMessages };
