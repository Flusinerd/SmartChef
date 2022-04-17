import "./card.css";

function SCCard(props: SCCardProps) {
  return (
    <div
      className="sc-card"
      style={{
        backgroundColor: props.backgroundColor,
        color: props.fontColor,
      }}
    >
      <div className="sc-card-header">
        {props.header || <h2 className="sc-card-title">{props.title}</h2>}
      </div>
      <div className="sc-card-body">{props.children}</div>
    </div>
  );
}

export default SCCard;

export interface SCCardProps {
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  backgroundColor?: string;
  fontColor?: string;
}
