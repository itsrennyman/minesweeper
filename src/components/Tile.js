export const Tile = (props) => {
  const { value, mine, flagged, hidden } = props;

  if (!hidden) {
    return (
      <div
        style={{ height: 40, width: 40, background: mine ? "#ff0000" : "#eee" }}
      >
        <div>{value}</div>
      </div>
    );
  }

  return (
    <button
      onClick={props.onClick}
      style={{ height: 40, width: 40, background: "#eee" }}
    >
      {value}
    </button>
  );
};
