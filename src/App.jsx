import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { WinMessage } from "./components/WinHeader";
import { useGameLogic } from "./hooks/useGameLogic";

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
  const {cards, score, moves, initializeGame, isGameComplete, handleCardClick} = useGameLogic(cardValues);
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      
      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClickF={handleCardClick} /> 
        ))}
      </div>
    </div>
  );
}

export default App;
