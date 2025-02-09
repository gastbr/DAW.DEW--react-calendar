import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fakeEvents } from '../context/fakeEvents.jsx';
import { isSameDay } from '../utils/helpers.jsx';
// Crear un contexto para eventos
const EventContext = createContext();

// Función reductora para gestionar el estado de los eventos
const eventReducer = (state, action) => {
    if (!state) return [];
    switch (action.type) {
        case 'ADD_EVENT':
            return [...state, action.payload];
        case 'EDIT_EVENT':
            return state.map((event) =>
                event.id === action.payload.id ? action.payload : event
            );
        case 'DELETE_EVENT':
            return state.filter((event) => event.id !== action.payload);
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
};


// Componente EventProvider para proporcionar el contexto de eventos a los hijos
const EventProvider = ({ children }) => {

    EventProvider.propTypes = {
        // Validación de tipos de propiedades
        children: PropTypes.array.isRequired,
    }

    // Inicializar el estado de los eventos con datos de localStorage o fakeEvents
    const [events, dispatch] = useReducer(eventReducer, [], () => {
        const localData = localStorage.getItem('events');
        return localData && localData !== "[]" ? JSON.parse(localData) : fakeEvents;
    });

    // Guardar eventos en localStorage siempre que cambien
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    // Función para manejar el cambio de entrada de búsqueda
    const handleSearch = (e, setSearchParams) => {
        setSearchParams({ search: e.target.value });
    };

    // Función para navegar al mes anterior
    const seePrevMonth = (setCurrentMonth, setCurrentYear, currentMonth) => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    // Función para navegar al siguiente mes
    const seeNextMonth = (setCurrentMonth, setCurrentYear, currentMonth) => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };

    // Función para navegar al mes actual
    const seeCurrentMonth = (setCurrentMonth, setCurrentYear, currentDate) => {
        setCurrentMonth(currentDate.getMonth());
        setCurrentYear(currentDate.getFullYear());
    };

    // Función para manejar el clic en un día del calendario
    const handleDayClick = (day, currentYear, currentMonth, setSelectedDate, setShowEventPopup, setEventTime, setEventText, setEditingEvent) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
            setEventTime({ hours: '00', minutes: '00' });
            setEventText('');
            setEditingEvent(null);
        } else {
            alert('No puedes crear eventos en el pasado');
        }
    };

    // Función para manejar el envío de eventos
    const handleSubmitEvent = (editingEvent, selectedDate, eventTime, eventText, dispatch, setEventTime, setEventText, setShowEventPopup, setEditingEvent) => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: eventText,
        };

        if (editingEvent) {
            dispatch({ type: 'EDIT_EVENT', payload: newEvent });
        } else {
            dispatch({ type: 'ADD_EVENT', payload: newEvent });
        }

        setEventTime({ hours: '00', minutes: '00' });
        setEventText('');
        setShowEventPopup(false);
        setEditingEvent(null);
    };

    // Función para manejar la edición de eventos
    const handleEditEvent = (event, setSelectedDate, setEventTime, setEventText, setEditingEvent, setShowEventPopup) => {
        setSelectedDate(new Date(event.date));
        setEventTime({
            hours: event.time.split(':')[0],
            minutes: event.time.split(':')[1],
        });
        setEventText(event.text);
        setEditingEvent(event);
        setShowEventPopup(true);
    };

    // Función para manejar la eliminación de eventos
    const handleDeleteEvent = (eventId, dispatch) => {
        dispatch({ type: 'DELETE_EVENT', payload: eventId });
    };

    return (
        <EventContext.Provider value={{ events, dispatch, handleSearch, seePrevMonth, seeNextMonth, seeCurrentMonth, handleDayClick, handleSubmitEvent, handleEditEvent, handleDeleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };