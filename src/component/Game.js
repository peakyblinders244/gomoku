import { useEffect } from "react";
import { useState } from "react";
import { Board } from "./Board";
import { sortType } from "../until/Action.Type";
import { pieces } from "../until/Action.Type";
import { checkWin } from "../until/Matrix";
import { History } from "./History";
export const Game = (props) => {
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
  const [winner, line] = checkWin(
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
    if (checkWin(squares, props.size, props.numWin)[0]) {
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
            checkWin(
              state.history[state.step].squares,
              props.size,
              props.numWin
            )[1] || []
          }
          size={props.size}
        />
      </div>
      <History
        handleState
        
        size={props.size}
        state={state}
        handleClick={(value) => {
          setState(value);
        }}
      />
    </div>
  );
};
