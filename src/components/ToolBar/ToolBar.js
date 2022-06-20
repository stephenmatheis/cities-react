import React, { useRef } from 'react';
import './ToolBar.css';

function ToolBar({ setHourType, setClockType }) {
    const selectedHour = useRef(null);
    const selectedClock = useRef(null);

    return (
        <div id="toolbar">
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedHour.current.style.left = '10px';
                        setHourType(24);

                        // FIXME: Under development
                        // document.querySelector('#time-container').style.transform = `translateX(${window.innerWidth}px)`;
                    }}
                >
                    24 Hour
                </button>
                <button
                    type="button"
                    onClick={() => {
                        selectedHour.current.style.left = '190px';
                        setHourType(12);

                        // FIXME: Under development
                        // document.querySelector('#time-container').style.transform = `translateX(${window.innerWidth}px)`;
                    }}
                >
                    12 Hour
                </button>
                <div 
                    className='selected'
                    ref={selectedHour}
                ></div>
            </div>
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = '10px';
                        setClockType('Digital');
                    }}
                >
                    Digital
                </button>
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = '190px';
                        setClockType('Analog');
                    }}
                >
                    Analog
                </button>
                <div
                    className='selected'
                    ref={selectedClock}
                ></div>
            </div>
        </div>
    );
}

export default ToolBar;
