import { useEffect, useState } from "react";
import Card from "./components/Card";
import cardsData from "./data";
import "./App.css";
import fetchDisneyCharacters from "./helper";

function App() {
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([...cardsData]);
  const [glow, setGlow] = useState(false);
  const [loading, setLoading] = useState(false);

  const shuffleCards = (cardsArray: typeof cardsData) => {
    const shuffled = [...cardsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
    setCards((prev) => shuffleCards(prev));
  };

  const loadCharacters = async () => {
    setLoading(true);
    const newCards = await fetchDisneyCharacters();

    if (newCards.length > 0) {
      setCards(newCards);
    }
    setLoading(false);
  };

  useEffect(() => {
    setCards(shuffleCards(cardsData));
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
          <h1>
            <span className="highlight">(Disney)</span> Memory card game
          </h1>
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
      <div className="newCharacters">
        <button onClick={loadCharacters}>Get new characters</button>
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
