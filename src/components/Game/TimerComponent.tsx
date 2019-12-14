import React from "react";
import Timer from "react-compound-timer";

interface TimerComponentProps {
    timerRunning: boolean,
    TimeCheckpoint: Function
}

const TimerComponent: React.FC<TimerComponentProps> = ({timerRunning, TimeCheckpoint}): JSX.Element => {
    return(
        <>
            <div className={"Timer"}>
                <Timer
                    initialTime={59000} //25 seconds, change time here
                    direction="backward"
                    startImmediately={false}
                    checkpoints={[
                        {
                            time: 0,
                            callback: () => TimeCheckpoint(0),
                        },
                        {
                            time: 5000,
                            callback: () => TimeCheckpoint(5),
                        },
                        {
                            time: 10000,
                            callback: () => TimeCheckpoint(10),
                        },
                        {
                            time: 15000,
                            callback: () => TimeCheckpoint(15),
                        },
                        {
                            time: 20000,
                            callback: () => TimeCheckpoint(20),
                        },
                        {
                            time: 24000,
                            callback: () => TimeCheckpoint(25),
                        },
                    ]}
                >
                    {({reset, start, getTimerState, pause,}:
                          {reset:any, stop: any, start:any, getTimerState: any, pause: any}) => (
                        <React.Fragment>
                            <Timer.Seconds /> seconds
                            {timerRunning ? start() : pause()}
                            {timerRunning ? null : reset()}
                            {/*TimerState: {getTimerState()}*/}

                        </React.Fragment>
                    )}
                </Timer>
            </div>
        </>
    );
}

export default TimerComponent;