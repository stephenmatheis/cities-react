import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './NavBar.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function NavBar({ selectedCity, setSelectedCity }) {
    const [ cities, setCities ] = useState([]);
    const [ selectedSection, setSelectedSection ] = useState('');
    const [ selectedBtn, setSelectedBtn ] = useState(null);
    const [ addTransition, setAddTransition ] = useState(null);
    const nav = useRef();
    const slider = useRef();

    useEffect(() => {
        fetchData();
        window.addEventListener('resize', onResize);
    }, [ ]);

    useEffect(() => {
        if (selectedCity && !selectedBtn) {
            setSelectedBtn(nav.current.querySelector(`.city[data-section="${selectedCity.section}"]`));
        }

        // FIXME: 
        // Adding onResize to dependency array fires setSliderSizeAndPosition every time this effect is run,
        // which is every second.
        console.log('fired');
        setSliderSizeAndPosition();
    }, [ selectedBtn, onResize ]);

    async function fetchData() {
        // Fetch and await JSON document
        const site = 'https://cities-react.netlify.app/';
        const api = window.location.href === site ? `${site}.netlify/functions/cities` :  'http://localhost:2035/cities';
        const requestData = await fetch(api);

        // Await return of object parsed from JSON document
        const data = await requestData.json();

        // Set cities array
        setCities(data);

        // Now that all data has been fetched, show app
        document.body.style.display = 'flex';
    }

    function onResize() {
        // Clear addTransition so it only fires once
        // (i.e. after the user has finished resizing the window)
        clearTimeout(addTransition);

        // Remove transition while resizing
        slider.current.classList.remove('transition');

        // Set slider
        setSliderSizeAndPosition();

        // Add transition back
        setAddTransition(
            setTimeout(() => {
                slider.current.classList.add('transition');
            }, 200)
        );
    }

    function setSliderSizeAndPosition() {
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
    }

    return (
        <div className='nav-container'>
            <nav ref={nav}>
                {
                    cities.map(({ section, label }) => {
                        return (
                            <div
                                key={section}
                                className={classNames('city', {selected: selectedSection === section || selectedCity && selectedCity.section === section })}
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
