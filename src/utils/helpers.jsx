import { useState, useEffect } from "react";

// Helper functions
export const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const formatDate = (date, selectedDate, currentDate, events) => {
    if (isSameDay(date, selectedDate)) return "selected-day";
    if (isSameDay(date, currentDate)) return "current-day";
    if (events.some(event => isSameDay(new Date(event.date), date))) return "event-day";
    return "";
};

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Fetch fallido: Sin respuesta');
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};