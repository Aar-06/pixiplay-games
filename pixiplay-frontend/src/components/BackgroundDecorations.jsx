import "../styles/background.css";

function BackgroundDecorations() {
    return (
        <>
            <div className="background-decorations">
                <div className="bg-grid"></div>

                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>

                <span className="floating flower flower1">🌸</span>
                <span className="floating flower flower2">🌸</span>
                <span className="floating flower flower3">🌸</span>
                <span className="floating flower flower4">🌸</span>

                <span className="floating star star1">⭐</span>
                <span className="floating star star2">⭐</span>
                <span className="floating star star3">⭐</span>

                <span className="floating heart heart1">❤️</span>
                <span className="floating heart heart2">❤️</span>
                <span className="floating heart heart3">❤️</span>
            </div>
        </>
    );
}

export default BackgroundDecorations;