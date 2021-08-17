import { useEffect, useState } from "react";
import { Cell } from "./Cell";

const styles = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 40px)",
  columnGap: "5px",
  rowGap: "5px",
};

const INITIAL_CELL = { status: null, flagged: false, hidden: true };

export const Grid = (props) => {
  const [gameField, setGameField] = useState([]);

  useEffect(() => {
    const mines = dropMines(props.nMines);
    const matrix = drawGrid(props.size, mines);
    setGameField(matrix);
  }, [props.size]);

  const drawGrid = (size, mines) => {
    let grid = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const mine = mines.find((m) => m.x === j && m.y === i);
        grid = [
          ...grid,
          { ...INITIAL_CELL, x: j, y: i, status: mine ? "X" : null },
        ];
      }
    }

    return grid;
  };

  const dropMines = (nMines) => {
    let mines = [];

    for (let i = 0; i < nMines; i++) {
      const mine = getCoordinates(0, nMines - 1);
      mines = [...mines, mine];
    }

    return mines;
  };

  const isTheSameCell = (cell, target) => {
    return cell.x === target.x && cell.y === target.y;
  };

  // TODO: this is shit.
  const getAdjacentCells = (cell) => {
    const { x, y } = cell;

    const adjCoordinates = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      // [x, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ].filter((el) => {
      if (el[0] >= 0 && el[1] >= 0 && el[0] < 10 && el[1] < 10) {
        return el;
      }
    });

    const cells = [];
    adjCoordinates.forEach((adjCoord) => {
      const c = gameField.find(
        (el) => el.x === adjCoord[0] && el.y === adjCoord[1]
      );
      cells.push(c);
    });

    return cells;
  };

  const isMine = (cell) => cell.status === "X";

  const handleClick = (cell) => {
    if (isMine(cell)) {
      alert("GAME OVER!");
      return false;
    }

    const adjacentCells = getAdjacentCells(cell);
    const adjacentMines = adjacentCells.filter(isMine);

    setGameField((gameField) =>
      gameField.map((target) => {
        if (isTheSameCell(cell, target)) {
          return { ...target, hidden: false, status: adjacentMines.length };
        }

        return target;
      })
    );
  };

  return (
    <div style={styles}>
      {gameField.map((cell) => (
        <Cell
          onClick={() => handleClick(cell)}
          key={`${cell.x}_${cell.y}`}
          data={cell}
        />
      ))}
    </div>
  );
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

const adjacents = (x, y) => {
  // TODO: Refactor
  const adjCoordinates = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    // [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter((el) => {
    if (el[0] >= 0 && el[1] >= 0 && el[0] < 10 && el[1] < 10) {
      return el;
    }
  });
};
