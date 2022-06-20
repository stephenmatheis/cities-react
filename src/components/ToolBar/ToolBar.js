import React, { useRef } from 'react';
import './ToolBar.css';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
function ToolBar({ hourType, clockType, setHourType, setClockType }) {
    const selectedHour = useRef(null);
    const selectedClock = useRef(null);
    const left = '10px';
    const right = '190px';

    return (
        <div id="toolbar">
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedHour.current.style.left = left;
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
                        selectedHour.current.style.left = right;
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
                    style={{ left: hourType === 24 ? left : right }}
                ></div>
            </div>
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = left;
                        setClockType('Digital');
                    }}
                >
                    Digital
                </button>
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = right;
                        setClockType('Analog');
                    }}
                >
                    Analog
                </button>
                <div
                    style={{ left: clockType === 'Digital' ? left : right }}
                    className='selected'
                    ref={selectedClock}
                ></div>
            </div>
        </div>
    );
}

export default ToolBar;
