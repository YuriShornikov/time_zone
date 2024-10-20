import React, { useState } from 'react';
import { Clock } from './components/Clock/Clock';

interface ClockInfo {
    id: number;
    city: string;
    timezoneOffset: number;
}

export const App: React.FC = () => {
    const [clocks, setClocks] = useState<ClockInfo[]>([]);
    const [cityName, setCityName] = useState('');
    const [timezoneOffset, setTimezoneOffset] = useState<number>(0);

    const addClock = (e: React.FormEvent) => {
        e.preventDefault();
        const newClock: ClockInfo = {
            id: Date.now(),
            city: cityName,
            timezoneOffset: timezoneOffset,
        };
        setClocks([...clocks, newClock]);
        setCityName('');
        setTimezoneOffset(0);
    };


    const removeClock = (id: number) => {
        setClocks(clocks.filter((clock) => clock.id !== id));
    };

    return (
        <div>
            <h1>World Clocks</h1>
            <form className='enter-form' onSubmit={addClock}>
                <div className='enter-name'>
                    <label>Название:</label>
                    <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        required
                    />
                </div>
                <div className='enter-gtm'>
                    <label>Временная зона:</label>
                    <input
                        type="number"
                        value={timezoneOffset}
                        onChange={(e) => setTimezoneOffset(Number(e.target.value))}
                        required
                    />
                </div>
                <button className='enter-btn' type="submit">Добавить</button>
            </form>
            <div>
                {clocks.map((clock) => (
                    <Clock
                        key={clock.id}
                        id={clock.id}
                        city={clock.city}
                        timezoneOffset={clock.timezoneOffset}
                        removeClock={removeClock}
                    />
                ))}
            </div>
        </div>
    );
};
