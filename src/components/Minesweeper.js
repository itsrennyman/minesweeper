import { useGame } from "../hooks/useGame";
import { Tile } from "./Tile";

export const Minesweeper = (props) => {
  const { matrix, showTile, drawGrid } = useGame(
    props.height,
    props.width,
    props.mines
  );

  return (
    <div className="space-y-5">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.width}, 48px)`,
          columnGap: "5px",
          rowGap: "5px",
        }}
        className="border border-gray-600 rounded p-4"
      >
        {matrix.map((row, y) =>
          row.map((tile, x) => (
            <Tile onClick={() => showTile(tile)} key={x + y} {...tile} />
          ))
        )}
      </div>

      <button
        onClick={drawGrid}
        className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-blue-300 md:py-4 md:text-lg md:px-10"
      >
        Play Again
      </button>
    </div>
  );
};

Minesweeper.defaultProps = {
  height: 10,
  width: 10,
  mines: 10,
};
