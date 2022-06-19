import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './NavBar.css';

function NavBar({ selectedCity, setSelectedCity }) {
    const [ cities, setCities ] = useState([]);
    const [ selectedSection, setSelectedSection ] = useState('');
    const [ selectedBtn, setSelectedBtn ] = useState(null);
    const slider = useRef();

    useEffect(() => {
        (async function fetchData() {
            // Fetch and await JSON document
            const requestData = await fetch('https://peppy-salmiakki-a559f4.netlify.app/.netlify/functions/cities');

            // Await return of object parsed from JSON document
            const data = await requestData.json();

            // Set cities array
            setCities(data);

            // Now that all data has been fetched, show app
            document.body.style.display = 'flex';
        })();
    }, [ ]);

    useEffect(() => {
        if (!selectedBtn) {
            return;
        }
        
        // Get position values of selected city
        const { width, height, top, left} = selectedBtn.getBoundingClientRect();

        // Get body padding in pixels
        const bodyPaddingOffset = parseInt(getComputedStyle(document.body).padding.replace('px', '')) || 0;

        // Resize slider size and position to mirror nav link on click
        if (window.innerWidth > 700) {
            // Update left and width
            slider.current.style.left = `${left - bodyPaddingOffset}px`;
            slider.current.style.width = `${width}px`;

            // Reset top and height
            slider.current.style.top = '0px';
            slider.current.style.height = '1px';
        } else {
            // Update top and height
            slider.current.style.top = `${top - bodyPaddingOffset}px`;
            slider.current.style.height = `${height}px`;

            // Reset left and width
            slider.current.style.left = '0px'
            slider.current.style.width = `1px`;
        }
    }, [ selectedBtn ]);

    return (
        <div className='nav-container'>
            <nav>
                {
                    cities.map(({ section, label }) => {
                        return (
                            <div
                                key={section}
                                className={classNames('city', {selected: selectedSection === section })}
                                data-section={section}
                                onClick={(event) => {
                                    setSelectedSection(event.target.dataset.section);
                                    setSelectedBtn(event.target);
                                    setSelectedCity(cities.find(city => city.section === event.target.dataset.section));
                                }}
                            >
                                {label}
                            </div>
                        )
                    })
                }
            </nav>
            <div id="bar">
                <div
                    id="slider"
                    className="transition"
                    ref={slider}
                ></div>
            </div>
        </div>
    );
}

export default NavBar;
