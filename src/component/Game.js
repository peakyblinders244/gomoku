import { useEffect } from "react";
import { useState } from "react";
import { Board } from "./Board";
import { sortType } from "../until/Action.Type";
import { pieces } from "../until/Action.Type";
import { calculateWinner } from "../until/Matrix";
export const Game = (props) => {
  const [sort, setSort] = useState(sortType.ASC);

  const [state, setState] = useState({
    history: [
      {
        squares: Array(props.size * props.size).fill(null),
      },
    ],
    step: 0,
    xIsNext: true,
  });

  useEffect(() => {
    setState({
      history: [
        {
          squares: Array(props.size * props.size).fill(null),
        },
      ],
      step: 0,
      xIsNext: true,
    });
  }, [props.size]);
  const [winner, line] = calculateWinner(
    state.history[state.step].squares,
    props.size,
    props.numWin
  );
  const clickCheck = (i) => {
    const history = state.history.slice(0, state.step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] != null) {
      return;
    }
    if (calculateWinner(squares, props.size, props.numWin)[0]) {
      return;
    }
    squares[i] = state.xIsNext ? pieces.X : pieces.O;

    setState({
      history: history.concat([
        {
          squares: squares,
          location: i,
          isX: state.xIsNext,
        },
      ]),
      step: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <div>
          {winner
            ? "Người chiến thắng: " + winner
            : "Lượt tiếp theo: " + (state.xIsNext ? "X" : "O")}
        </div>
        <Board
          onClick={(i) => clickCheck(i)}
          squares={state.history[state.step].squares}
          lineWin={
            calculateWinner(
              state.history[state.step].squares,
              props.size,
              props.numWin
            )[1] || []
          }
          size={props.size}
        />
      </div>

      <div>
        <div>
          <button
            onClick={() => {
              setSort(sortType.ASC);
            }}
          >
            Asc Sort
          </button>
          <button
            onClick={() => {
              setSort(sortType.DSC);
            }}
          >
            Des Sort
          </button>
        </div>

        <ol className={sort == "ASC" ? "" : "reserve"}>
          {state.history.map((step, move) => {
            const turn = move
              ? "Bước #" +
                move +
                " " +
                (step.isX ? "X" : "O") +
                `(${step.location % props.size},${Math.floor(
                  step.location / props.size
                )})`
              : "Bắt đầu";
            return (
              <li
                key={move}
                className={`history-button ${
                  move === state.stepNumber ? "history-selected" : " "
                }`}
              >
                <button
                  onClick={() => {
                    setState({
                      ...state,
                      step: move,
                      xIsNext: move % 2 === 0,
                    });
                  }}
                >
                  {turn}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
