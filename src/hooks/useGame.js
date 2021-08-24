import { useEffect, useState } from "react";

export const useGame = (height = 10, width = 10, mines = 10) => {
  const [matrix, setMatrix] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => drawGrid(), []);

  const INITIAL_TILE = {
    value: null,
    mine: false,
    flagged: false,
    hidden: true,
  };

  const drawGrid = () => {
    const mtx = [];

    for (let y = 0; y < height; y++) {
      const row = [];

      for (let x = 0; x < width; x++) {
        row.push({ ...INITIAL_TILE, x, y });
      }

      mtx.push(row);
    }

    const minedMtx = dropMines(mtx);

    setMatrix(minedMtx);
    setIsFinished(false);
  };

  const dropMines = (mtx) => {
    let nMines = 0;

    while (nMines < mines) {
      const { x, y } = getCoordinates(height - 1, width - 1);

      if (!mtx[y][x].mine) {
        mtx[y][x].mine = true;
        nMines++;
      }
    }

    return mtx;
  };

  const adjacents = (x, y, mtx) => {
    const tiles = [];

    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        const tile = mtx[yOffset + y]?.[xOffset + x];

        if (tile) {
          tiles.push(mtx[yOffset + y][xOffset + x]);
        }
      }
    }

    return tiles;
  };

  const showMines = () => {
    setMatrix((matrix) =>
      matrix.map((row) =>
        row.map((tile) => (tile.mine ? { ...tile, hidden: false } : tile))
      )
    );
  };

  const showTile = (tile) => {
    if (!tile.hidden || isFinished) {
      return false;
    }

    if (tile.mine) {
      setIsFinished(true);
      return showMines();
    }

    const adj = adjacents(tile.x, tile.y, matrix);
    const adjMines = adj.filter((el) => el.mine);

    matrix[tile.y][tile.x] = {
      ...tile,
      hidden: false,
      value: adjMines.length ? adjMines.length : null,
    };

    setMatrix([...matrix]);

    if (!adjMines.length) {
      adj.forEach((el) => showTile(el));
    }
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getCoordinates = (height, width) => {
    const y = getRandomIntInclusive(0, height);
    const x = getRandomIntInclusive(0, width);

    return { x, y };
  };

  return { matrix, showTile, drawGrid };
};
