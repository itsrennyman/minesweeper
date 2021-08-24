export const Tile = (props) => {
  const { value, mine, flagged, hidden } = props;

  if (!hidden) {
    return (
      <div
        className={`h-12 w-12 flex items-center justify-center rounded shadow-sm text-gray-200 font-bold ${
          mine ? "bg-red-500 border border-red-400" : "bg-gray-800"
        }`}
      >
        <div>{value}</div>
      </div>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className="h-12 w-12 inline-flex items-center border border-gray-700 rounded bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
    ></button>
  );
};
