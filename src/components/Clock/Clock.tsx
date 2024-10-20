import React, { useEffect, useState } from 'react';

interface ClockProps {
    id: number;
    city: string;
    timezoneOffset: number;
    removeClock: (id: number) => void;
}

export const Clock: React.FC<ClockProps> = ({ id, city, timezoneOffset, removeClock }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const tick = () => {
            setTime(new Date());
        };

        const interval = setInterval(tick, 1000);
    
        return () => {
            clearInterval(interval); // Очистка интервала при размонтировании компонента
        };
    }, []);

    const getLocalTime = () => {
        const utc = time.getTime() + time.getTimezoneOffset() * 60000;
        const localTime = new Date(utc + timezoneOffset * 3600000);
        return localTime;
    };

    const localTime = getLocalTime();

    return (
        <div>
        <h3>{city}</h3>
        <p>{localTime.toLocaleTimeString()}</p>
        <button onClick={() => removeClock(id)}>Удалить</button>
        </div>
    );
};

