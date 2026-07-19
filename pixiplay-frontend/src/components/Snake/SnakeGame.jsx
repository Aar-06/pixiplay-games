import { useEffect, useState } from "react";
import { saveScore } from "../../services/scoreService";
import "./SnakeGame.css";

const GRID_SIZE = 20;

function SnakeGame({ onScoreChange, onTimeChange, paused}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [snake, setSnake] = useState([
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
    ]);

    const [direction, setDirection] = useState("RIGHT");

    const [food, setFood] = useState({
        x: 15,
        y: 15
    });

    const [score, setScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);

    const [seconds, setSeconds] = useState(0);

    const [scoreSaved, setScoreSaved] = useState(false);

    useEffect(() => {
        if(gameOver || paused) return;
        const interval = setInterval(() => {

            setSnake((prevSnake) => {

                const head = { ...prevSnake[0] };

                switch (direction) {

                    case "UP":
                        head.y -= 1;
                        break;

                    case "DOWN":
                        head.y += 1;
                        break;

                    case "LEFT":
                        head.x -= 1;
                        break;

                    case "RIGHT":
                        head.x += 1;
                        break;

                    default:
                        break;
                }

                const newSnake = [head, ...prevSnake];

                // Wall collision
                if(
                    head.x < 0 ||
                    head.x >= GRID_SIZE ||
                    head.y < 0 ||
                    head.y >= GRID_SIZE
                ){
                    setGameOver(true);
                    return prevSnake;
                }

                // Self collision
                if(
                    prevSnake.some(
                        segment =>
                            segment.x === head.x &&
                            segment.y === head.y
                    )
                ){
                    setGameOver(true);
                    return prevSnake;
                }
                // Food eaten
                if(
                    head.x === food.x &&
                    head.y === food.y
                ){

                    setFood(generateFood(newSnake));

                    setScore(prev => {
                        const newScore = prev + 10;

                        onScoreChange?.(newScore);

                        return newScore;
                    });
                }
                else{

                    newSnake.pop();

                }

                return newSnake;

            });

        }, 200);

        return () => clearInterval(interval);

    }, [direction, food, gameOver]);

    useEffect(() => {

    const handleKeyDown = (event) => {

        switch(event.key){

            case "ArrowUp":
                setDirection("UP");
                break;

            case "ArrowDown":
                setDirection("DOWN");
                break;

            case "ArrowLeft":
                setDirection("LEFT");
                break;

            case "ArrowRight":
                setDirection("RIGHT");
                break;

            default:
                break;

        }

    };
    window.addEventListener("keydown", handleKeyDown);

    return () =>
        window.removeEventListener("keydown", handleKeyDown);

    }, []);

    const generateFood = (snakeBody) => {
        let newFood;
        do{

            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };

        }while(
            snakeBody.some(
                segment =>
                    segment.x === newFood.x &&
                    segment.y === newFood.y
            )
        );
        return newFood;
    };

    useEffect(() => {
    if (paused || gameOver) return;
    const timer = setInterval(() => {
        setSeconds(prev => {
            const newTime = prev + 1;
            onTimeChange?.(newTime);
            return newTime;
        });
    },1000);

    return ()=>clearInterval(timer);

    },[paused, gameOver]);

    useEffect(() => {
        if (!gameOver || scoreSaved) return;

        saveScore(user.id, "Snake", score)
            .then((response) => {
                console.log("Score saved!");
                console.log(response);
                setScoreSaved(true);
            })
            .catch((err) => {
                console.error("Failed to save score", err);
            });

    }, [gameOver]);

    return (
        <div className="snake-container">
            <div className="snake-board">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {

                    const x = index % GRID_SIZE;
                    const y = Math.floor(index / GRID_SIZE);

                    const isSnake = snake.some(
                        segment => segment.x === x && segment.y === y
                    );
                    
                    const isFood = food.x === x && food.y === y;

                    return (

                        <div
                            key={index}
                            className={`snake-cell 
                                ${isSnake ? "snake" : ""}
                                ${isFood ? "food" : ""}
                                `}
                        />

                    );

                })}

            </div>
        </div>

    );

}

export default SnakeGame;