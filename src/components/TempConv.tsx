import { useState } from "react";

function cToF(t: number) {
  return (t * 9) / 5 + 32;
}

function fToC(t: number) {
  return ((t - 32) * 5) / 9;
}

function TempConv() {
  const [valueC, setValueC] = useState("0");
  const [valueF, setValueF] = useState("32");

  function changeC(e: React.ChangeEvent<HTMLInputElement>) {
    const tStr = e.target.value;
    setValueC(tStr);
    const t = parseFloat(tStr);
    if (isFinite(t)) {
      setValueF("" + cToF(t));
    }
  }

  function changeF(e: React.ChangeEvent<HTMLInputElement>) {
    const tStr = e.target.value;
    setValueF(tStr);
    const t = parseFloat(tStr);
    if (isFinite(t)) {
      setValueC("" + fToC(t));
    }
  }

  return (
    <div>
      <input
        onChange={changeC}
        value={valueC}
        className="temp-conv-input temp-conv-input-lhs"
      />
      °C ={" "}
      <input onChange={changeF} value={valueF} className="temp-conv-input" />
      °F
    </div>
  );
}

export default TempConv;
