import { useEffect, useState } from "react";
import { Tile } from "./Tile";
import { getCoordinates } from "../utils";

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

  const isTheSameTile = (tile, target) => {
    return tile.x === target.x && tile.y === target.y;
  };

  // TODO: this is shit.
  const getAdjacentTiles = (tile) => {
    const { x, y } = tile;

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

    const tiles = [];
    adjCoordinates.forEach((adjCoord) => {
      const c = gameField.find(
        (el) => el.x === adjCoord[0] && el.y === adjCoord[1]
      );
      tiles.push(c);
    });

    return tiles;
  };

  const isMine = (tile) => tile.status === "X";

  const handleClick = (tile) => {
    if (isMine(tile)) {
      alert("GAME OVER!");
      return false;
    }

    const adjacentTiles = getAdjacentTiles(tile);
    const adjacentMines = adjacentTiles.filter(isMine);

    setGameField((gameField) =>
      gameField.map((target) => {
        if (isTheSameTile(tile, target)) {
          return {
            ...target,
            hidden: false,
            status: adjacentMines.length ? adjacentMines.length : null,
          };
        }

        return target;
      })
    );
  };

  return (
    <div style={styles}>
      {gameField.map((tile) => (
        <Tile
          onClick={() => handleClick(tile)}
          key={`${tile.x}_${tile.y}`}
          data={tile}
        />
      ))}
    </div>
  );
};
