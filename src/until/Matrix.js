import { pieces } from "./Action.Type";

const getLines = (pos, size, numWin) => {
  const horizontalLine = getHorizontal(pos, size, numWin);
  const verticalLine = getVertical(pos, size, numWin);
  const diagonalLine = getDiagonal(pos, size, numWin);
  const reverseDiagonalLine = getReverseDiagonal(pos, size, numWin);

  const lines = [
    horizontalLine,
    verticalLine,
    diagonalLine,
    reverseDiagonalLine,
  ];
  return lines.filter((line) => {
    return line.length === numWin;
  });
};

const getHorizontal = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) + i < size) {
      line.push(pos + i);
    }
  }
  return line;
};

const getVertical = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if (Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size);
    }
  }

  return line;
};

const getDiagonal = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) + i < size && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size + i);
    }
  }
  return line;
};

const getReverseDiagonal = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) - i >= 0 && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size - i);
    }
  }

  return line;
};

const compare = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
};

export function checkWin(squares, size, numWin) {
  const lineWins = [Array(numWin).fill(pieces.X), Array(numWin).fill(pieces.O)];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      const lines = getLines(i, size, numWin);
      for (let j = 0; j < lines.length; j++) {
        let line = lines[j];
        let lineValues = [];
        for (let k = 0; k < line.length; k++) {
          lineValues.push(squares[line[k]]);
        }
        if (lineWins.find((l) => compare(l, lineValues))) {
          return [squares[i], line];
        }
      }
    }
  }
  if (!squares.includes(null)) {
    return ["Hòa", []];
  }
  return [null, null];
}
