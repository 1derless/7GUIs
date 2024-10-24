import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0n);
  return (
    <button onClick={() => setCount(count + 1n)}>
      Count: {count.toString()}
    </button>
  );
}

export default Counter;
