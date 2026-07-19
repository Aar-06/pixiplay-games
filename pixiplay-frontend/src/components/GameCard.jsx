import { useNavigate } from "react-router-dom";
import "../styles/gameCard.css";

function GameCard({ image, title, score }) {
    const navigate = useNavigate();
    return (
        <div className="game-card">
            <img
                src={image}
                alt={title}
                className="game-image"
            />
            <h3>{title}</h3>
            <p>🏆 High Score: {score}</p>
            <button onClick={() => navigate(`/game/${title.toLowerCase()}`)}>PLAY</button>
        </div>
    );
}

export default GameCard;