export const WinMessage = ({ moves }) => {
    return (
        <div className="win-message">
            <h2>Congratulations!</h2>
            <p>You finished in {moves} moves.</p>
        </div>
    );
};
