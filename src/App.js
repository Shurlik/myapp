import React, {Component} from 'react';
import {Observable} from "rxjs";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import "./App.css"

class App extends Component {

    constructor() {
        super();
        this.state = {time: {s: 0, m: 0, h: 0}, started: false}
        this.started = false;
        this.sub = null;
        this.timer = null;
        this.observable = new Observable(subscriber => {
            this.started = true;
            let count = 1;
            this.setState({...this.state, started: true})
            this.timer = setInterval(() => {
                subscriber.next(count);
                if (count === 60) {
                    count = 1
                }
                count++;
            }, 1000);
        })

        this.start = () => {
            if (!this.started) {
                this.sub = this.observable.subscribe((elem) => {
                    if (elem === 60) { // if in if it's a little bit heavy decision ((....
                        if (this.state.time.m === 59) {
                            this.setState({
                                ...this.state,
                                time: {...this.state.time, m: 0, h: this.state.time.h + 1}
                            })
                        } else {
                            this.setState({...this.state, time: {...this.state.time, m: this.state.time.m + 1}})
                        }
                        elem = 0;
                    }
                    this.setState({time: {...this.state.time, s: elem}, started: true})
                })
            }
        }

        this.stop = () => {
            if (this.started) {
                this.sub.unsubscribe()
                this.started = false;
                this.setState({time: {s: 0, m: 0, h: 0}, started: false});
            }
        }

        this.pause = () => { // for now - I don't know how to do it.
            alert("Sorry... (((")
        }

        this.reset = () => {
            if (this.started) {
                this.stop();
                setTimeout(() => {
                    this.start();
                }, 1) // костыль ((
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="main-section">
                <div className="clock-holder">
                    <div className="stopwatch">
                        <Display
                            time={this.state.time}
                        />
                        <Buttons start={this.start} stop={this.stop} pause={this.pause} started={this.started}
                                 reset={this.reset}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

