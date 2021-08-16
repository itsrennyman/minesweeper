import { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = (props) => {
  const { status, flagged } = props.data;

  return (
    <div style={{ height: 40, width: 40, background: "#eee" }}>
      {props.debug === true && (
        <div>
          {props.x} - {props.y}
        </div>
      )}
      <div>{status}</div>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 40px);
  column-gap: 5px;
  row-gap: 5px;
`;

const INITIAL_CELL = { status: null, flagged: false };

const generate = (size) => {
  const m = [];

  for (let i = 0; i < size; i++) {
    const row = [];

    for (let j = 0; j < size; j++) {
      row[j] = INITIAL_CELL;
    }

    m.push(row);
  }

  return m;
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getCoordinates = (min, max) => {
  let isCorrect = false;
  let x, y;

  while (!isCorrect) {
    x = getRandomIntInclusive(min, max);
    y = getRandomIntInclusive(min, max);

    if (x !== y) {
      isCorrect = true;
    }
  }

  return { x, y };
};

const fillWithMines = (matrix, mines) => {
  for (let i = 0; i <= mines; i++) {
    const { x, y } = getCoordinates(0, mines - 1);
    matrix[x][y] = { ...matrix[x][y], status: "X" };
  }

  return matrix;
};

// const fillWithMarkers = (matrix) => {
//   return matrix;

//   for (let y = 0; y < matrix.length; y++) {
//     for (let x = 0; x < matrix.length; x++) {
//       const adjacentMines = calculateAdjacents(x, y, matrix);
//       matrix[x][y] = adjacentMines;
//       //console.log("dd");
//     }
//   }

//   return matrix;
// };

// const validCoordinate = (el) =>
//   el.every((number) => number >= 0 && number <= 9);

// const calculateAdjacents = (x, y, matrix) => {
//   const adjacents = [
//     [x - 1, y - 1],
//     [x, y - 1],
//     [x + 1, y - 1],
//     [x - 1, y],
//     [x, y],
//     [x + 1, y],
//     [x - 1, y + 1],
//     [x, y + 1],
//     [x + 1, y + 1],
//   ];

//   const sum = adjacents
//     .filter((el) =>
//       el.every((number) => {
//         return number >= 0 && number <= 9;
//       })
//     )
//     .filter((el) => {
//       console.log("el", el);
//       return matrix[el[0]][el[1]] === "X";
//     }).length;

//   //console.log("SUM", sum);

//   return sum;
// };

export function App() {
  const [size, setSize] = useState(10);
  const [mines, setMines] = useState(10);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    setMatrix(fillWithMines(generate(size), mines));
  }, [size, mines]);

  return (
    <div>
      <div>Minesweeper</div>

      <Grid>
        {matrix.map((row, y) =>
          row.map((cell, x) => (
            <Cell key={`${x}_${y}`} debug x={x} y={y} data={cell} />
          ))
        )}
      </Grid>
    </div>
  );
}

export default App;
