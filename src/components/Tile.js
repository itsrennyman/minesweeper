export const Tile = (props) => {
  const { value, mine, flagged, hidden } = props;

  if (!hidden) {
    return (
      <div
        className={`h-10 w-10 flex items-center justify-center rounded shadow-sm text-sm font-bold ${
          mine ? "bg-red-500" : "bg-gray-100"
        }`}
      >
        <div>{value}</div>
      </div>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className="h-10 w-10 inline-flex items-center border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {value}
    </button>
  );
};
