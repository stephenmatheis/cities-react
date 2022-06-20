import React, { useEffect, useRef, useState } from 'react';
import './ToolBar.css';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
function ToolBar({ hourType, clockType, setHourType, setClockType }) {
    const selectedHour = useRef(null);
    const selectedClock = useRef(null);
    const [ addhourTypeTransition, setAddHourTypeTransition ] = useState(null);
    const [ addClockTypeTransition, setAddClockTypeTransition ] = useState(null);
    const left = '10px';
    const right = '190px';
    const top = '10px';
    const bottom = '85px';

    useEffect(() => {
        window.removeEventListener('resize', onResizeToolBar);
        window.addEventListener('resize', onResizeToolBar);
    }, [ hourType, clockType ]);

    useEffect(() => {
        setHourTypePosition();
    }, [ hourType ]);

    useEffect(() => {
        setClockTypePosition();
    }, [ clockType ]);

    function onResizeToolBar() {
        console.clear();
        console.log('toolbar resize');

        console.log(hourType, clockType);

        clearTimeout(addhourTypeTransition);
        clearTimeout(addClockTypeTransition);

        selectedHour.current.classList.remove('transition');
        selectedClock.current.classList.remove('transition');

        setHourTypePosition();
        setClockTypePosition();

        setAddHourTypeTransition(
            setTimeout(() => {
                selectedHour.current.classList.add('transition');
            }, 200)
        );

        setAddClockTypeTransition(
            setTimeout(() => {
                selectedClock.current.classList.add('transition');
            }, 200)
        );
    }

    function setHourTypePosition() {
        if (!selectedHour) {
            return;
        }
        
        if (window.innerWidth > 700) {
            selectedHour.current.style.left = hourType === 24 ? left : right;
            selectedHour.current.style.top = top
        } else {
            selectedHour.current.style.top = hourType == 24 ? top : bottom;
            selectedHour.current.style.left = left;
        }
    }

    function setClockTypePosition() {
        if (!selectedClock) {
            return;
        }
        
        if (window.innerWidth > 700) {
            selectedClock.current.style.left = clockType === 'Digital' ? left : right;
            selectedClock.current.style.top = top
        } else {
            selectedClock.current.style.top = clockType == 'Digital' ? top : bottom;
            selectedClock.current.style.left = left;
        }
    }

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
                    className='selected transition'
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
                    className='selected transition'
                    ref={selectedClock}
                    style={{ left: clockType === 'Digital' ? left : right }}
                ></div>
            </div>
        </div>
    );
}

export default ToolBar;
