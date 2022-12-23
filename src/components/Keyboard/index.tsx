import Key from "../Key";
import "./style.css";

function Keyboard() {
  const keyboardValues = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  return (
    <div className="keyboard">
      {keyboardValues.map((row, index) => {
        return (
          <ul key={index} className="keyboard__row">
            {row.map((key, index) => {
              return <Key key={index} letter={key} />;
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Keyboard;
