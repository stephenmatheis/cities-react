import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Time from './components/Time/Time';
import ToolBar from './components/ToolBar/ToolBar';

/**
 * 
 * @returns 
 */
function App() {
    const [ selectedCity, setSelectedCity ] = useState(JSON.parse(localStorage.getItem('city')) || null);
    const [ hourType, setHourType ] = useState(parseInt(localStorage.getItem('hour-type')) || 24);
    const [ hourPeriod, setHourPeriod ] = useState('AM');
    const [ clockType, setClockType ] = useState(localStorage.getItem('clock-type',) || 'Digital');
    const [ hours, setHours ] = useState('00');
    const [ minutes, setMinutes ] = useState('00');
    const [ seconds, setSeconds ] = useState('00');
    const [ timezone, setTimezone ] = useState('PLACEHOLDER');
    const [ updateTime, setUpdateTime ] = useState(null);

    useEffect(() => {
        clearInterval(updateTime);

        if (!selectedCity) {
            return;
        }

        setTime();

        setUpdateTime(
            setInterval(() => {
                setTime();
            }, 1000)
        );

    }, [ selectedCity, hourType, hours, minutes, seconds ]);

    useEffect(() => {
        localStorage.setItem('hour-type', hourType.toString());
        localStorage.setItem('clock-type', clockType);
        localStorage.setItem('city', JSON.stringify(selectedCity));
    }, [ hourType, clockType, selectedCity ])

    useEffect(() => {
        const hoursNum = parseInt(hours);

        setHours(hourType === 24 ? (hoursNum < 10 ? `0${hoursNum}` : hours) : hoursNum);
    }, [ hourType ]);

    function setTime() {
        const { label, area, api } = selectedCity;
        const date = new Date().toLocaleTimeString('default', { timeZone: `${area}/${api || label.replaceAll(' ', '_')}`, hour12: false, timeZoneName: 'long' });
        const [ time, ...timeZone ] = date.split(' ');
        const [ hh, mm, ss ] = time.split(':');
        const timeZoneName = timeZone.join(' ');

        if (hourType === 24) {
            setHours(hh === '24' ? '00' : hh);
        } else {
            const [ time, period ] = new Date()
                .toLocaleTimeString('default', { timeZone: `${area}/${api || label.replaceAll(' ', '_')}` })
                .split(' ');

            setHours(time.split(':')[0]);
            setHourPeriod(period);
        }

        setMinutes(mm);
        setSeconds(ss);
        setTimezone(timeZoneName);
    }

    return (
        <div className="App">
            <header>
                <NavBar
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                />
            </header>
            <main>
                <Time 
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    timezone={timezone}
                    hourType={hourType}
                    hourPeriod={hourPeriod}
                    clockType={clockType}
                    selectedCity={selectedCity}
                />
                <ToolBar
                    hourType={hourType}
                    clockType={clockType}
                    setHourType={setHourType}
                    setClockType={setClockType}
                ></ToolBar>
            </main>
            <footer>
                <button
                    id='reset'
                    onClick={() => {
                        localStorage.clear();
                        setSelectedCity(null);
                        setClockType('Digital');
                        setHourType(24);
                        setHours('00');
                        setMinutes('00');
                        setSeconds('00');
                        setTimezone('PLACEHOLDER');
                    }}
                >
                    Reset
                </button>
            </footer>
        </div>
    );
}

export default App;
