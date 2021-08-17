import { useState } from "react";
import { Grid } from "./components/Grid";

export function App() {
  const [size, setSize] = useState(10);
  const [nMines, setNMines] = useState(10);

  return (
    <div>
      <div>Minesweeper</div>
      <Grid size={size} nMines={nMines} />
    </div>
  );
}

export default App;
