interface Props {
  completion: number;
}

function ProgressBar(props: Props) {
  const innerStyle = {
    width: `${props.completion}%`,
  };

  return (
    <div className="progressbar-outer">
      <div style={innerStyle} className="progressbar-inner" />
    </div>
  );
}

export default ProgressBar;
