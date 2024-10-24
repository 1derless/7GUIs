import { useState } from "react";

const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const N_ROWS = 100;
const INITIAL_CELLS = new Array(N_ROWS).fill(
  new Array(ALPHABET.length).fill(""),
);

function Cells() {
  const [cellValues, setCellValues] = useState<string[][]>(INITIAL_CELLS);
  const [focus, setFocus] = useState<null | { rowNo: number; colNo: number }>(
    null,
  );

  function setCellValue(rowNo: number, colNo: number, newValue: string) {
    const newRow = cellValues[rowNo].with(colNo, newValue);
    setCellValues(cellValues.with(rowNo, newRow));
  }

  const cache = new Map<number, number>();
  function calcValue(rowNo: number, colNo: number): number {
    if (rowNo < 0 || N_ROWS <= rowNo || colNo < 0 || ALPHABET.length <= colNo)
      return 0;

    const cellValue = cellValues[rowNo][colNo];
    if (cellValue !== "=") return +cellValue;

    const cacheIndex = rowNo * ALPHABET.length + colNo;
    let val = cache.get(cacheIndex);
    if (val === undefined) {
      val = calcValue(rowNo - 1, colNo) + calcValue(rowNo, colNo - 1);
      cache.set(cacheIndex, val);
    }
    return val;
  }

  function renderRow(row: string[], rowNo: number) {
    const cellsHtml = row.map((cellValue: string, colNo: number) => {
      const calcedValue =
        cellValue === "=" &&
        !(focus?.rowNo === rowNo && focus?.colNo === colNo);
      return (
        <td key={colNo}>
          <input
            value={calcedValue ? calcValue(rowNo, colNo) : cellValue}
            onChange={(e) => setCellValue(rowNo, colNo, e.target.value)}
            onFocus={() => setFocus({ rowNo, colNo })}
            onBlur={() => setFocus(null)}
          />
        </td>
      );
    });
    return (
      <tr key={rowNo}>
        <th scope="col">{rowNo}</th>
        {cellsHtml}
      </tr>
    );
  }

  const headerCells = ALPHABET.map((c) => <th key={c}>{c}</th>);
  return (
    <table className="cells">
      <thead>
        <tr>
          <th></th>
          {headerCells}
        </tr>
      </thead>
      <tbody>{cellValues.map(renderRow)}</tbody>
    </table>
  );
}

export default Cells;
