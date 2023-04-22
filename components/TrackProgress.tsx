interface TrackProgressProps {
  stringLeft: string,
  stringRight:string
  left: number;
  right: number;
  onChange: (event: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  stringLeft,
  stringRight,
  left,
  right,
  onChange,
}) => {
  return (
    <div style={{ display: "flex",color:"#3b3b3b",fontFamily:'monospace' }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {stringLeft} / {stringRight}
      </div>
    </div>
  );
};

export default TrackProgress;
