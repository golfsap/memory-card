interface CardProps {
  name: string;
  src: string;
  onClick: (cardTitle: string) => void;
}

// const API_KEY = "m8uAzdWsQ3CCT8drxuY7yPvs5O7tW9jD";
// const trendingURL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=5`;

export default function Card({ name, src, onClick }: CardProps) {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <h2>{name}</h2>
      <img src={src} alt={name}></img>
    </div>
  );
}
