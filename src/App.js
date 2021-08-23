import { useGame } from "./hooks/useGame";
import { Tile } from "./components/Tile";

const styles = {
  display: "grid",
  gridTemplateColumns: "repeat(20, 40px)",
  columnGap: "5px",
  rowGap: "5px",
};

export function App() {
  const { matrix, showTile } = useGame(10, 20, 10);

  return (
    <div>
      <div>Minesweeper</div>

      <div style={styles}>
        {matrix.map((row, y) =>
          row.map((tile, x) => (
            <Tile onClick={() => showTile(tile)} key={x + y} {...tile} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
