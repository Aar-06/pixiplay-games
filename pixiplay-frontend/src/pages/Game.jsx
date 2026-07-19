import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BackgroundDecorations from "../components/BackgroundDecorations";
import SnakeGame from "../components/Snake/SnakeGame";

import "../styles/game.css";

function Game() {

    const navigate = useNavigate();

    const { gameName } = useParams();

    const [currentScore, setCurrentScore] = useState(0);
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [paused, setPaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [restartKey, setRestartKey] = useState(0);

    return (
        <>
            <BackgroundDecorations />
            <div className="game-page">

                <div className="game-header">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>

                    <div className="game-title">
                        {gameName.toUpperCase()}
                    </div>

                    <div className="current-score">
                        🏆 {currentScore}
                    </div>

                </div>

                <div className="game-window">

                    {
                        gameName === "snake" &&

                        <SnakeGame
                            key={restartKey}
                            onScoreChange = {setCurrentScore}
                            onTimeChange={setTime}
                            paused={paused}
                        />
                    }

                </div>

                <div className="stats-row">

                    <div className="stat-card">
                        ⭐<br />
                        High Score
                        <br />
                        350
                    </div>

                    <div className="stat-card">
                        ⏱<br />
                        Time
                        <br />
                        {`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`}
                    </div>

                    <div className="stat-card">
                        ❤️<br />
                        Lives
                        <br />
                        1
                    </div>

                </div>

                <div className="controls">

                    <button
                        onClick={() => setPaused(prev => !prev)}
                    >
                        {paused ? "Resume" : "Pause"}
                    </button>

                    <button
                        onClick={() => {
                            setRestartKey(prev => prev + 1);
                            setScore(0);
                            setGameOver(false);
                        }}
                    >
                        Restart
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Exit
                    </button>

                </div>
            </div>
        </>                
    );

}

export default Game;