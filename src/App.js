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
    const [ selectedCity, setSelectedCity ] = useState(null);
    const [ hourType, setHourType ] = useState(24);
    const [ hourPeriod, setHourPeriod ] = useState('AM');
    const [ clockType, setClockType ] = useState('Analog');
    const [ hours, setHours ] = useState('00');
    const [ minutes, setMinutes ] = useState('00');
    const [ seconds, setSeconds ] = useState('00');
    const [ timezone, setTimezone ] = useState('PLACEHOLDER');
    const [ updateTime, setUpdateTime ] = useState(null);

    useEffect(() => {
        if (!selectedCity) {
            return;
        }

        clearInterval(updateTime);

        setTime();

        setUpdateTime(
            setInterval(() => {
                setTime();
            }, 1000)
        )
    }, [ selectedCity, hourType ]);

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
            setHours(parseInt(hh));
            setHourPeriod(
                new Date()
                .toLocaleTimeString('default', { timeZone: `${area}/${api || label.replaceAll(' ', '_')}` })
                .split(' ')[1]
            );
        }

        setMinutes(mm);
        setSeconds(ss);
        setTimezone(timeZoneName);
    }

    return (
        <div className="App">
            <header>
                <NavBar
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
                />
                <ToolBar
                    hourType={hourType}
                    clockType={clockType}
                    setHourType={setHourType}
                    setClockType={setClockType}
                ></ToolBar>
            </main>
        </div>
    );
}

export default App;
