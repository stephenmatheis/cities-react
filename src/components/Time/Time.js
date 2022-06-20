import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import './Time.css';

function Time({ hours, minutes, seconds, timezone, hourType, hourPeriod, clockType }) {
    const hourHand = useRef(null);
    const minuteHand = useRef(null);
    const secondHand = useRef(null);

    useEffect(() => {
        const hour = hours * 30;
        const minute = minutes * 6;
        const second = seconds * 6;
        
        if (!hourHand.current && !minuteHand.current && !secondHand.current) {
            return;
        }

        console.log(hour, minute, second);

        hourHand.current.style.transform = `rotate(${hour}deg)`;
        minuteHand.current.style.transform = `rotate(${minute}deg)`;
        second == 0
            ? secondHand.current.classList.add("hide-transition")
            : secondHand.current.classList.remove("hide-transition");
        secondHand.current.style.transform = `rotate(${second}deg)`;
        
        // dynamic shadow
        let hourOffsetSign = hour > 135 && hour < 315 ? "-" : "";
        let minuteOffsetSign = minute > 135 && minute < 315 ? "-" : "";
        let secondOffsetSign = second > 135 && second < 315 ? "-" : "";
        
        hourHand.current.style.boxShadow = `${hourOffsetSign}6px ${hourOffsetSign}6px 6px #b8b9be`;
        minuteHand.current.style.boxShadow = `${minuteOffsetSign}6px ${minuteOffsetSign}6px 6px #b8b9be`;
        secondHand.current.style.boxShadow = `${secondOffsetSign}6px ${secondOffsetSign}6px 6px #b8b9be`;


    }, [ hours, minutes, seconds, clockType ]);

    return (
        <div id='time-container'>
            {
                clockType === 'Digital' &&
                <div id="time">
                    <div
                        className={classNames('time-block', { narrow: hourType === 12 && hours < 10 })}
                    >
                        <div id="hh">{hours}</div>
                        <div className='unit'>h</div>
                    </div>
                    <div className="divider">:</div>
                    <div className='time-block'>
                        <div id="mm">{minutes}</div>
                        <div className='unit'>m</div>
                    </div>
                    <div className="divider">:</div>
                    <div className='time-block'>
                        <div id="ss">{seconds}</div>
                        <div className='unit'>s</div>
                    </div>
                    {
                        hourType === 12 && 
                        <div id='hour-period'>
                            {hourPeriod}
                        </div>
                    }
                </div>
            }
            {
                clockType === 'Analog' &&
                <div className="clock-container">
                    <div className="clock">
                        <span className="hour" ref={hourHand}></span>
                        <span className="minute" ref={minuteHand}></span>
                        <span className="second" ref={secondHand}></span>
                        <span className="axis"></span>
                    </div>
                </div>
            }
            <div
                id="time-zone"
                className={classNames({ opaque: timezone === 'PLACEHOLDER'})}
            >
                {timezone}
            </div>
        </div>
    );
}

export default Time;
