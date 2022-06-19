import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Time from './components/Time/Time';

function App() {
    const [ selectedCity, setSelectedCity ] = useState(null);
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
    }, [ selectedCity ])

    function setTime() {
        const { label, area, api } = selectedCity;
        const date = new Date().toLocaleTimeString('default', { timeZone: `${area}/${api || label.replaceAll(' ', '_')}`, hour12: false, timeZoneName: 'long' });
        const [ time, ...timeZone ] = date.split(' ');
        const [ hh, mm, ss ] = time.split(':');
        const timeZoneName = timeZone.join(' ');

        setHours(hh);
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
                />
            </main>
        </div>
    );
}

export default App;
