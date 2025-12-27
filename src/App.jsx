import { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";

const cardValues = [
  "🐈", "🐈",
  "🐈‍⬛", "🐈‍⬛",
  "🐒", "🐒",
  "🐎", "🐎",
  "🐶", "🐶",
  "🐱", "🐱",
  "🐼", "🐼",
  "🦊", "🦊"
];

function App() {
  // Set a state for the cards, at first empty
  const [cards, setCards] = useState([]);

  const initializeGame = () => {
    // SUFFLE THE CARDS
    const cardsSeq = cardValues.map((value, index) => ({ 
        // mapping emoji -> obj w/ fields
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));
    
    // changes state of cards as array of objects with fields above
    setCards(cardsSeq);
  };

  // Hook that allows us to run once post render
  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // Don't allow clicking post flipped or matched
    if (card.isFlipped || card.isMatched) {
      return;
    } 

    // Update card flipped state, rem map is just a loop
    const newCards = cards.map((c) => {
      if (c.id === card.id) { // curr card id = prop id
        return {...c, isFlipped: true}
      } else {
        return c;
      }
    });
    setCards(newCards);

    const
  };

  return (
    <div className="app">
      <GameHeader score={3} moves={3} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} /> 
        ))}
      </div>
    </div>
  );
}

export default App;
