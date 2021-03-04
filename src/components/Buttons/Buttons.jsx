import React from "react";

function Buttons({start, stop, pause, reset, started}) {
    return (
        <div>

            {!started && <button
                className="stopwatch-btn stopwatch-btn-gre"
                onClick={start}
            >
                Start
            </button>}
            {started && <button
                className="stopwatch-btn stopwatch-btn-red"
                onClick={stop}
            >
                Stop
            </button>}
            <button
                className="stopwatch-btn stopwatch-btn-blue"
                onClick={pause}
            >
                Wait
            </button>
            <button
                className="stopwatch-btn stopwatch-btn-yel"
                onClick={reset}
            >
                Reset
            </button>

        </div>
    );
}

export default Buttons;
