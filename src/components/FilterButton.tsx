function FilterButton({
  name,
  setFilter,
  isPressed,
}: {
  name: string;
  setFilter: (name: string) => void;
  isPressed: boolean;
}) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
