import { pieces } from "../until/Action.Type";
import { sortType } from "../until/Action.Type";
import { useState } from "react";
import { useEffect } from "react";

export const History = (props) => {
  const [sort, setSort] = useState(sortType.ASC);
  const [state, setState] = useState(props.state);
  const [size, setSize] = useState(props.size);
  useEffect(() => {
    setState(props.state);
  }, [props.state]);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setSort(sortType.ASC);
          }}
        >
          Tăng dần
        </button>
        <button
          onClick={() => {
            setSort(sortType.DSC);
          }}
        >
          Giảm dần
        </button>
      </div>

      <ol className={sort == sortType.ASC ? "" : "reserve"}>
        {state.history.map((step, index) => {
          console.log(index);
          console.log(step);
          console.log(props.size);
          const turn = index
            ? (step.isX ? pieces.X : pieces.O) +
              " " +
              `(${step.location % size};${Math.floor(step.location / size)})`
            : "Bắt đầu";
          return (
            <li key={index}>
              <button
                onClick={() => {
                  props.handleClick({
                    ...state,
                    step: index,
                    xIsNext: index % 2 === 0,
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
  );
};
