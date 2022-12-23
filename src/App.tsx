import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameContextProvider from "./context/GameContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <GameContextProvider>
      <div className="App">
        <Toaster />
        <Board />
        <Keyboard />
      </div>
    </GameContextProvider>
  );
}

export default App;
