const getLines = (pos, size, numWin) => {
  const horizontalLine = getHorizontalLine(pos, size, numWin);
  const verticalLine = getVerticalLine(pos, size, numWin);
  const diagonalLine = getDiagonalLine(pos, size, numWin);
  const reverseDiagonalLine = getReverseDiagonalLine(pos, size, numWin);

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

const getHorizontalLine = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) + i < size) {
      line.push(pos + i);
    }
  }
  return line;
};

const getVerticalLine = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if (Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size);
    }
  }
  return line;
};

const getDiagonalLine = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) + i < size && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size + i);
    }
  }
  return line;
};

const getReverseDiagonalLine = (pos, size, numWin) => {
  let line = [];
  for (let i = 0; i < numWin; i++) {
    if ((pos % size) - i > 0 && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size - i);
    }
  }
  return line;
};

const arrayCompare = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};

export function calculateWinner(squares, size, numWin) {
  const winningLines = [Array(numWin).fill("X"), Array(numWin).fill("O")];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      const lines = getLines(i, size, numWin);
      for (let j = 0; j < lines.length; j++) {
        let line = lines[j];
        let lineValues = [];
        for (let k = 0; k < line.length; k++) {
          lineValues.push(squares[line[k]]);
        }
        if (winningLines.find((l) => arrayCompare(l, lineValues))) {
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
