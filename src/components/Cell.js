export const Cell = (props) => {
  const { status, flagged, hidden } = props.data;

  if (!hidden) {
    return (
      <div style={{ height: 40, width: 40, background: "#eee" }}>
        <div>{status}</div>
      </div>
    );
  }

  return (
    <button
      onClick={props.onClick}
      style={{ height: 40, width: 40, background: "#eee" }}
    >
      {status}
    </button>
  );
};
