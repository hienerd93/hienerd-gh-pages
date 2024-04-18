type Props = {
  label: string;
  value: number;
  increment: () => void;
  decrement: () => void;
};

const TimeInput = ({ label, value, increment, decrement }: Props) => {
  return (
    <div className="TimeInput">
      <label>{label}</label>
      <div className="control">
        <button onClick={increment} className="btn">
          +
        </button>
        <span>{value}</span>
        <button onClick={decrement} className="btn">
          -
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
