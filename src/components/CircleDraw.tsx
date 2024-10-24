import React, { useState } from "react";

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface CanvasState {
  selected: null | number;
  circles: Circle[];
}

const defaultState: CanvasState = {
  selected: null,
  circles: [],
};

const GREY = "#444444";

function CircleDraw() {
  const [radius, setRadius] = useState(40);
  const [color, setColor] = useState(GREY);
  const [future, setFuture] = useState<CanvasState[]>([]);
  const [past, setPast] = useState<CanvasState[]>([]);
  const [canvasState, setCanvasState_] = useState(defaultState);

  const selected = canvasState.selected;
  const circles = canvasState.circles;

  function setCanvasState(newState: CanvasState) {
    setCanvasState_(newState);
    if (newState.selected !== null) {
      const circle = newState.circles[newState.selected];
      setRadius(circle.radius);
      setColor(circle.color);
    }
  }

  function commitStateToPast() {
    setPast([...past, canvasState]);
    setFuture([]);
  }

  function undo() {
    const last = past.at(-1);
    if (last === undefined) return;
    setFuture([canvasState, ...future]);
    setCanvasState(last);
    setPast(past.slice(0, -1));
  }

  function redo() {
    if (future.length === 0) return;
    setPast([...past, canvasState]);
    setCanvasState(future[0]);
    setFuture(future.slice(1));
  }

  function clickBackground(e: React.MouseEvent<SVGSVGElement>) {
    // Find where mouse clicked on SVG
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add circle
    commitStateToPast();
    setCanvasState({
      selected: circles.length,
      circles: [...circles, { x, y, radius, color }],
    });
  }

  function setSelected(newSelected: number) {
    setCanvasState({
      ...canvasState,
      selected: newSelected,
    });
  }

  function clickCircle(i: number) {
    return function clickResponse(e: React.MouseEvent) {
      e.stopPropagation();
      setSelected(i);
    };
  }

  function changeRadius(e: React.ChangeEvent<HTMLInputElement>) {
    const newRadius = +e.currentTarget.value;
    setRadius(newRadius);
    const newCircles = circles.map((c, i) =>
      i !== selected ? c : { ...c, radius: newRadius },
    );
    setCanvasState({
      ...canvasState,
      circles: newCircles,
    });
  }

  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    commitStateToPast();
    const newColor = e.currentTarget.value;
    setColor(newColor);
    const newCircles = circles.map((c, i) =>
      i !== selected ? c : { ...c, color: newColor },
    );
    setCanvasState({
      ...canvasState,
      circles: newCircles,
    });
  }

  const circlesSVG = circles.map((circle, i) => (
    <circle
      key={i}
      onClick={clickCircle(i)}
      className={i == selected ? "circle-drawer-selected" : ""}
      cx={circle.x}
      cy={circle.y}
      r={circle.radius}
      style={{ fill: circle.color }}
    />
  ));

  return (
    <div className="circle-drawer-frame">
      <svg className="circle-drawer-area" onClick={clickBackground}>
        {circlesSVG}
      </svg>
      <div className="circle-drawer-controls">
        <button disabled={past.length === 0} onClick={undo}>
          Undo
        </button>
        <button disabled={future.length === 0} onClick={redo}>
          Redo
        </button>
        <span>
          <label htmlFor="circleRadius">Radius </label>
          <input
            id="circleRadius"
            type="range"
            value={radius}
            onChange={changeRadius}
            onMouseDown={commitStateToPast}
          />
        </span>
        <span>
          <label htmlFor="circleColor">Colour </label>
          <input
            id="circleColor"
            type="color"
            value={color}
            onChange={changeColor}
          />
        </span>
      </div>
    </div>
  );
}

export default CircleDraw;
