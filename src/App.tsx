import { useState } from "react";
import Card from "./components/Card";
import cardsData from "./data";
import "./App.css";

function App() {
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([...cardsData]);

  const shuffleCards = (cardsArray: typeof cardsData) => {
    return [...cardsArray].sort(() => Math.random() - 0.5);
  };

  const handleClick = (cardTitle: string) => {
    if (!clickedCards.includes(cardTitle)) {
      setClickedCards((prev) => [...prev, cardTitle]);
      setCurrentScore((prev) => prev + 1);
    } else {
      setBestScore((prev) => Math.max(prev, currentScore));
      setCurrentScore(0);
      setClickedCards([]);
    }
    console.log(clickedCards);
    setCards(shuffleCards(cards));
  };

  return (
    <>
      <header>
        <h1>Memory card game</h1>
        <div className="scoreContainer">
          <p>Current Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <section className="cardContainer">
        {/* <Card /> */}
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
