import { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";

let cardValues = [
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

  // does not stop invalid flip, but rep a game phase
  const [isLocked, setIsLocked] = useState(0);

  const shuffle = (array) => {
    const arr = [...array]; // copy to avoid mutation
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const initializeGame = () => {
    // SUFFLE THE CARDS
    const shuffled = shuffle(cardValues);

    const cardsSeq = shuffled.map((value, index) => ({ 
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
    setIsLocked(false);
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
      // If we are on second card
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
          setIsLocked(false);
        }, 500);
        // Passing in param guarentees we change the prev state
        setScore((prev) => prev + 1);

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
          setIsLocked(false);
        }, 1000); 
      }

      setMoves((prev) => prev + 1);
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
