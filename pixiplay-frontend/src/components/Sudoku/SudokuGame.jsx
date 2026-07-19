import { useState } from "react";
import "./SudokuGame.css";

const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
];

const solution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9],
];

export default function SudokuGame() {

    const [board, setBoard] = useState(
        puzzle.map(row => [...row])
    );

    const handleChange = (r, c, value) => {

        if (puzzle[r][c] !== 0) return;

        if (value === "") value = 0;

        const copy = board.map(row => [...row]);

        copy[r][c] = Number(value);

        setBoard(copy);
    };

    const checkSolution = () => {

        const correct =
            JSON.stringify(board) === JSON.stringify(solution);

        alert(correct ? "🎉 Correct!" : "❌ Not solved yet");

    };

    const reset = () => {

        setBoard(puzzle.map(row => [...row]));

    };

    return (
        <div className="sudoku-container">


            <div className="grid">

                {board.map((row, r) =>
                    row.map((cell, c) => (

                        <input
                            key={`${r}-${c}`}
                            className={`
                                cell
                                ${c % 3 === 2 ? "right-border" : ""}
                                ${r % 3 === 2 ? "bottom-border" : ""}
                            `}
                            value={cell === 0 ? "" : cell}
                            readOnly={puzzle[r][c] !== 0}
                            maxLength={1}
                            onChange={(e) =>
                                handleChange(r, c, e.target.value)
                            }
                        />

                    ))
                )}

            </div>

            <div className="button-row">
                <button onClick={checkSolution}>
                    Check
                </button>

                <button onClick={reset}>
                    Reset
                </button>
            </div>

        </div>
    );
}