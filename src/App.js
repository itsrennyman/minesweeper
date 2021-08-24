import { Minesweeper } from "./components/Minesweeper";

export function App() {
  return (
    <section className="w-full px-6 pb-12 antialiased min-h-screen flex items-center bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="container max-w-lg px-4 pb-10 mx-auto text-left md:max-w-none md:text-center">
          <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-yellow-200">
              Minesweeper
            </span>
          </h1>
        </div>

        <div className="container max-w-lg px-4 flex justify-center md:max-w-none">
          <Minesweeper height={10} width={10} mines={10} />
        </div>
      </div>
    </section>
  );
}

export default App;
