import classNames from 'classnames';
import React from 'react';
import './Time.css';

function Time({ hours, minutes, seconds, timezone }) {
    return (
        <div>
            <div id="time">
                <div className='time-block'>
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
            </div>
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
