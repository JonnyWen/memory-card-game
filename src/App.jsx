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
  // Keep track of id of flipped cards
  const [isFlippedCards, setFlippedCards] = useState([]);
  // Keep track of which cards are matched

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

    const newFlippedCards = [...isFlippedCards, card.id];
    setFlippedCards(newFlippedCards); 
    // remember state only updates when react re-renders

    // check for match if two cards are flipped

    if (isFlippedCards.length === 1) {
      const firstCard = cards[isFlippedCards[0]];

      if (firstCard.value === card.value) {
        alert("Match");
      } else {
        // flip back card 1 and 2
        // setTimeout for unflip animation
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return {...c, isFlipped: false};
            } else {
              return c;
            }
          });
  
          setCards(flippedBackCards);
          // no more ids with isFlipped true
          setFlippedCards([]);
        }, 1000); // 1 second
        
      }
    }
  };

  return (
    <div className="app">
      <GameHeader score={3} moves={3} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClickF={handleCardClick} /> 
        ))}
      </div>
    </div>
  );
}

export default App;
