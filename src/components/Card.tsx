interface CardProps {
  name: string;
  src: string;
  onClick: (cardTitle: string) => void;
}

export default function Card({ name, src, onClick }: CardProps) {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <img src={src} alt={name}></img>
      <h2>{name}</h2>
    </div>
  );
}
