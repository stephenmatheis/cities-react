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
    const topShortView = '5px'
    const bottomShortView = '55px'

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
            selectedHour.current.style.top = top;

            return;
        }
        
        if (window.innerHeight > 748) {
            selectedHour.current.style.top = hourType === 24 ? top : bottom;
            selectedHour.current.style.left = left;

            return;
        }

        selectedHour.current.style.top = hourType === 24 ? topShortView : bottomShortView;
        selectedHour.current.style.left = '5px';
        selectedHour.current.style.display = 'block';
    }

    function setClockTypePosition() {
        if (!selectedClock) {
            return;
        }
        
        if (window.innerWidth > 700) {
            selectedClock.current.style.left = clockType === 'Digital' ? left : right;
            selectedClock.current.style.top = top;
            
            return;
        }

        if (window.innerHeight > 748) {
            selectedClock.current.style.top = clockType === 'Digital' ? top : bottom;
            selectedClock.current.style.left = left;

            return;
        }
        
        selectedClock.current.style.top = clockType === 'Digital' ? topShortView : bottomShortView;
        selectedClock.current.style.left = '5px';
        selectedClock.current.style.display = 'block';
    }

    return (
        <div id="toolbar">
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = left;
                        setClockType('Digital');
                        localStorage.setItem('clock-type', 'Digital');
                    }}
                >
                    Digital
                </button>
                <button
                    type="button"
                    onClick={() => {
                        selectedClock.current.style.left = right;
                        setClockType('Analog');
                        localStorage.setItem('clock-type', 'Analog');
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
            <div className="button-container">
                <button
                    type="button"
                    onClick={() => {
                        selectedHour.current.style.left = left;
                        setHourType(24);
                    }}
                >
                    24 Hour
                </button>
                <button
                    type="button"
                    onClick={() => {
                        selectedHour.current.style.left = right;
                        setHourType(12);
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
        </div>
    );
}

export default ToolBar;
