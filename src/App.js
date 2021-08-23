import { useGame } from "./hooks/useGame";
import { Tile } from "./components/Tile";

const styles = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 40px)",
  columnGap: "5px",
  rowGap: "5px",
};

export function App() {
  const { matrix, showTile } = useGame(10, 10, 10);

  return (
    <section class="w-full px-6 pb-12 antialiased bg-white">
      <div class="mx-auto max-w-7xl">
        <div class="container max-w-lg px-4 py-16 mx-auto text-left md:max-w-none md:text-center">
          <h1 class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
              Minesweeper
            </span>
          </h1>
        </div>

        <div class="container max-w-lg px-4 flex justify-center md:max-w-none">
          <div style={styles}>
            {matrix.map((row, y) =>
              row.map((tile, x) => (
                <Tile onClick={() => showTile(tile)} key={x + y} {...tile} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
