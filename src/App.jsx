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
  // Keep track of score
  const [score, setScore] = useState(0);
  // Keep track of moves
  const [moves, setMoves] = useState(0);

  // extra layer of saftey
  const [isLocked, setIsLocked] = useState(0);


  const initializeGame = () => {
    // SUFFLE THE CARDS
    const cardsSeq = cardValues.map((value, index) => ({ 
        // mapping emoji -> obj w/ fields
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));
    
    // all at initial state
    setCards(cardsSeq);
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
  };

  // useEffect is a post render hook
  useEffect(() => {
      initializeGame(); // <- desired effect
  }, []); // <- effect depends on nothing, so run once

  const handleCardClick = (card) => {
    
    // Don't allow clicking post flipped or matched
    if (card.isFlipped || card.isMatched || isFlippedCards.length === 2 || isLocked) {
      return;
    } 

    // Update card that was flipped
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return {...c, isFlipped: true}
      } else {
        return c;
      }
    });
    setCards(newCards);

    const newFlippedCards = [...isFlippedCards, card.id];

    // update isFlippedCards
    setFlippedCards(newFlippedCards); 

    // check for match if two cards are flipped

    if (isFlippedCards.length === 1) {
      setIsLocked(true);

      const firstCard = cards[isFlippedCards[0]];

      // Match case
      if (firstCard.value === card.value) {
        // alert("Match");
        setTimeout(() => {
    
          // update state of cards
          setCards((prev) => 
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) { 
                return {...c, isMatched: true}
              } else {
                return c;
              }
            })
          );
        
          setFlippedCards([]);
  
        }, 500);
        // Passing in param guarentees we change the prev state
        setScore((prev) => prev + 1);
        // No longer locked, as we changed cards state
        setIsLocked(false);
      // mismatch case
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
          
          setFlippedCards([]);
        }, 500); 
        
      }

      setMoves((prev) => prev + 1);
      setIsLocked(false);
    }
  };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClickF={handleCardClick} /> 
        ))}
      </div>
    </div>
  );
}

export default App;
