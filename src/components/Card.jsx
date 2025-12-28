
export const Card = ({ card, onClickF }) => {
    return (
        <div 
            className={`card ${card.isFlipped ? "flipped" : ""}
                             ${card.isMatched ? "matched" : ""}`} 
            onClick={() => onClickF(card)}
        >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    );
};