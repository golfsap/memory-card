import { useEffect, useState } from "react";
import Card from "./components/Card";
import cardsData from "./data";
import "./App.css";

function App() {
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([...cardsData]);
  const [glow, setGlow] = useState(false);

  const shuffleCards = (cardsArray: typeof cardsData) => {
    return [...cardsArray].sort(() => Math.random() - 0.5);
  };

  const handleClick = (cardTitle: string) => {
    if (!clickedCards.includes(cardTitle)) {
      setClickedCards((prev) => [...prev, cardTitle]);
      setCurrentScore((prev) => prev + 1);
    } else {
      setBestScore((prev) => {
        const newBestScore = Math.max(prev, currentScore);
        if (newBestScore > prev) setGlow(true);
        return newBestScore;
      });
      setCurrentScore(0);
      setClickedCards([]);
    }
    setCards(shuffleCards(cardsData));
  };

  useEffect(() => {
    setCards(shuffleCards(cardsData));
    console.log("Shuffling cards on mount");
  }, []);

  useEffect(() => {
    if (glow) {
      const timer = setTimeout(() => setGlow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [glow]);

  return (
    <>
      <header>
        <div className="titleContainer">
          <h1>Memory card game</h1>
          <p>Rules: don't click the same card twice!</p>
        </div>
        <div className="scoreContainer">
          <p>Current Score: {currentScore}</p>
          <p className={glow ? "glow" : ""}>Best Score: {bestScore}</p>
        </div>
      </header>
      <section className="cardContainer">
        {cards.map((card) => (
          <Card
            key={card.name}
            name={card.name}
            src={card.src}
            onClick={handleClick}
          />
        ))}
      </section>
    </>
  );
}

export default App;
