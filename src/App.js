import "./App.css";
import { useState } from "react";
import { Game } from "./component/Game";
import { Board } from "./component/Board";

function App() {
  const [init, setInit] = useState({ size: 3, numWin: 3 });

  return (
    <div className="App">
      <div className="form-field">
        <div>
          <label>GOMOKU</label>
        </div>
        <div className="size-field">
          <label>Kích thước bảng: </label>
          <input
            type="number"
            value={init.size}
            onChange={(e) => {
              setInit({ ...init, size: parseInt(e.target.value) });
            }}
          />
        </div>
        <div>
          <label>Số lượng đánh: </label>
          <input
            type="number"
            value={init.numWin}
            onChange={(e) => {
              setInit({ ...init, numWin: parseInt(e.target.value) });
            }}
          />
        </div>
      </div>
      <Game size={init.size} numWin={init.numWin} />
    </div>
  );
}

export default App;
