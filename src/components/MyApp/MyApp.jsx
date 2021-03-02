import React, { useState, useEffect } from "react";
import "./MyApp.scss";
import { Observable, interval } from "rxjs";

export default function Stopwatch() {
    const [counter, setCounter] = useState(0);
    const seconds = counter % 60;
    const minutes = Math.floor((counter / 60) % 60);
    const hours = Math.floor(counter / 3600);
    const [timerActive, setTimerActive] = useState(false);
    let timeout;

    useEffect(() => {
        if (timerActive) {
            timeout = setTimeout(setCounter, 1000, counter + 1);
        } else {
            setTimerActive(false);
        }
    }, [counter, timerActive]);

    const startStopAction = () => {
        if (!timerActive) {
            setTimerActive(true);
        } else {
            clearTimeout(timeout);
            setTimerActive(false);
            setCounter(0);
        }
    };

    const resetAction = () => {
        clearTimeout(timeout);
        setCounter(0);
        timeout = setTimeout(setCounter, 1000, counter + 1);
    };

    // const timer = new Observable((observer) => {
    //     let counter = 0;
    //     const intervalID = setInterval(() => {
    //         observer.next(counter++);
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalID);
    //     };
    // });

    const timer = interval(1000);
    const subscription = timer.subscribe({
        next: console.log,
    });

    setTimeout(() => {
        subscription.unsubscribe();
    }, 5000);

    return (
        <>
            <div className="timer">
                <div className="timer__display">
                    {hours}:{minutes}:{seconds}
                </div>
                <div className="timer__buttons">
                    <button onClick={startStopAction}>
                        {timerActive ? "Stop" : "Start"}
                    </button>
                    <button onClick={() => {}}>Wait</button>
                    <button onClick={resetAction}>Reset</button>
                </div>
            </div>
        </>
    );
}
