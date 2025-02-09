import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fakeEvents } from '../context/fakeEvents.jsx';

const EventContext = createContext();

const eventReducer = (state, action) => {
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

const EventProvider = ({ children }) => {

    EventProvider.propTypes = {
        // Prop types validation
        children: PropTypes.array.isRequired,
    }

    const [events, dispatch] = useReducer(eventReducer, [], () => {
        const localData = localStorage.getItem('events');
        return localData !== "[]" ? JSON.parse(localData) : fakeEvents;
    });

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    return (
        <EventContext.Provider value={{ events, dispatch }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };