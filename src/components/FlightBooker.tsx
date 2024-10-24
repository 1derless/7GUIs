import { useState } from "react";

function FlightBooker() {
  const [isReturn, setReturn] = useState(false);
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function toggleReturn() {
    setReturn(!isReturn);
  }

  function changeLeaveDate(event: React.ChangeEvent<HTMLInputElement>) {
    const newLeaveDate = event.target.value;
    setLeaveDate(newLeaveDate);
    if (newLeaveDate > returnDate) {
      setReturnDate("");
    }
  }

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const allValid = leaveDate && (!isReturn || returnDate);

  return (
    <fieldset className="flight-frame">
      <section>
        <h3>Flight Type</h3>
        <div>
          <input
            id="flight-is-single"
            type="radio"
            checked={!isReturn}
            onChange={toggleReturn}
          />
          <label htmlFor="flight-is-single">Single</label>
        </div>
        <div>
          <input
            id="flight-is-return"
            type="radio"
            checked={isReturn}
            onChange={toggleReturn}
          />
          <label htmlFor="flight-is-return">Return</label>
        </div>
      </section>
      <section>
        <h3>Leave Flight</h3>
        <label htmlFor="flight-leave-date">Date</label>
        <input
          id="flight-leave-date"
          type="date"
          required
          min={todayStr}
          value={leaveDate}
          onChange={changeLeaveDate}
        />
      </section>
      <section className={isReturn ? "" : "flight-return-disabled"}>
        <h3> Return Flight</h3>
        <label htmlFor="flight-return-date">Date</label>
        <input
          id="flight-return-date"
          type="date"
          min={leaveDate}
          disabled={!isReturn}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </section>
      <button type="submit" disabled={!allValid}>
        Book Flight
      </button>
    </fieldset>
  );
}

export default FlightBooker;
