import { useEffect, useState } from "react";
import { getTrivia } from "../services/triviaService";
import BackgroundDecorations from "../components/BackgroundDecorations";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";

import "../styles/dashboard.css";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [trivia, setTrivia] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const decodeHtml = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };

    const loadTrivia = () => {
        getTrivia()
            .then((data) => {
                console.log(data);

                setTrivia(data);

                if (data.results && data.results.length > 0) {
                    const question = data.results[0];

                    const shuffledOptions = [
                        ...question.incorrect_answers,
                        question.correct_answer,
                    ].sort(() => Math.random() - 0.5);

                    setOptions(shuffledOptions);
                }

                setSelectedAnswer(null);
                setIsCorrect(null);
            })
            .catch(console.error);
    };

    useEffect(() => {
        loadTrivia();
    }, []);

    const handleAnswer = (option) => {
        if (selectedAnswer) return;

        setSelectedAnswer(option);

        const correct =
            option === trivia.results[0].correct_answer;

        setIsCorrect(correct);
    };

    return (
        <div className="dashboard-page">

            <BackgroundDecorations />

            <Navbar
                title="Dashboard"
                username={user.username}
            />

            <section className="dashboard-header">
                <h1>Hello, {user.username}! 👋</h1>
                <p>Ready for another adventure?</p>
            </section>

            <section className="games-section">

                <GameCard
                    image="/images/games/snake.png"
                    title="Snake"
                    score="250"
                />

                <GameCard
                    image="/images/games/sudoku.png"
                    title="Sudoku"
                    score="180"
                />

                <GameCard
                    image="/images/games/2048.png"
                    title="2048"
                    score="1024"
                />

            </section>

            <section className="trivia-section">

                <h2>🎯 Daily Trivia</h2>

                {trivia ? (
                    <>
                        <p className="trivia-question">
                            {decodeHtml(trivia.results[0].question)}
                        </p>

                        <div className="trivia-options">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className="trivia-option"
                                    onClick={() => handleAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {decodeHtml(option)}
                                </button>
                            ))}
                        </div>

                        {selectedAnswer && (
                            <p
                                className={
                                    isCorrect
                                        ? "correct-answer"
                                        : "wrong-answer"
                                }
                            >
                                {isCorrect
                                    ? "🎉 Correct!"
                                    : `❌ Wrong! Correct Answer: ${decodeHtml(
                                          trivia.results[0].correct_answer
                                      )}`}
                            </p>
                        )}

                        <button
                            className="login-btn"
                            style={{ marginTop: "20px" }}
                            onClick={loadTrivia}
                        >
                            Next Question
                        </button>

                    </>
                ) : (
                    <p>Loading trivia...</p>
                )}

            </section>

        </div>
    );
}

export default Dashboard;