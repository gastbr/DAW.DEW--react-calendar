/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Crear un contexto para el estado del calendario
const CalendarContext = createContext();

// Componente CalendarProvider para proporcionar el contexto del calendario a los hijos
const CalendarProvider = ({ children }) => {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
    const [eventText, setEventText] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    // Calcular el número de días en el mes actual
    const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentYear, currentMonth]);
    // Calcular el primer día del mes actual
    const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 0).getDay(), [currentYear, currentMonth]);

    return (
        <CalendarContext.Provider value={{
            currentMonth,
            setCurrentMonth,
            currentYear,
            setCurrentYear,
            currentDate,
            selectedDate,
            setSelectedDate,
            showEventPopup,
            setShowEventPopup,
            eventTime,
            setEventTime,
            eventText,
            setEventText,
            editingEvent,
            setEditingEvent,
            daysInMonth,
            firstDayOfMonth,
            searchQuery,
            setSearchParams
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

export { CalendarContext, CalendarProvider };
