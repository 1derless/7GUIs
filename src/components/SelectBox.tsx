interface SelectBoxProps {
  selected: null | number;
  entries: string[];
  onSelect: (index: number) => void;
}

function SelectBox(props: SelectBoxProps) {
  const entries = props.entries.map((text, key) => (
    <li
      key={key}
      className={props.selected === key ? "selected-entry" : ""}
      onClick={() => props.onSelect(key)}
    >
      {text}
    </li>
  ));

  return <ul className="select-box">{entries}</ul>;
}

export default SelectBox;
