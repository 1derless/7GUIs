import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const MIN_DURATION = 0;
const MAX_DURATION = 120;

function formatTime(secs: number) {
  const minutes = Math.floor(secs / 60);
  const secsStr = `${secs % 60}`.padStart(2, "0");
  return `${minutes}:${secsStr}`;
}

function Timer() {
  const [ticker, setTicker] = useState(0);
  const [start, setStart] = useState(ticker);
  const [duration, setDuration] = useState((MIN_DURATION + MAX_DURATION) / 2);

  useEffect(() => {
    function tick() {
      setTicker((x) => x + 1);
    }
    const interval = setInterval(tick, 1000);
    return () => clearTimeout(interval);
  }, []);

  const elapsed = ticker - start;
  const completion = duration === 0 ? 100 : (elapsed / duration) * 100;

  if (elapsed > duration) {
    setStart(ticker - duration);
  }

  return (
    <div className="progressbar-demo">
      <ProgressBar completion={completion} />
      <div className="progressbar-demo-group">
        <span>Elapsed time: </span>
        <div className="progressbar-demo-elapsed">
          <button onClick={() => setStart(ticker)}>Reset</button>
          <span>{formatTime(elapsed)}</span>
        </div>
        <label>Duration: </label>
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
        />
      </div>
    </div>
  );
}

export default Timer;
