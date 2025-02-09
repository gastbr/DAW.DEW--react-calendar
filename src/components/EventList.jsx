/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext.jsx';
import { EventContext } from '../context/eventContext.jsx';
import EventPopup from './eventPopup.jsx';

// Componente EventList para mostrar la lista de eventos
const EventList = ({ filteredEvents, setEditingEvent }) => {
    const {
        searchQuery,
        setSearchParams,
        showEventPopup,
        eventText,
        setEventText,
        eventTime,
        setEventTime,
        editingEvent,
        setShowEventPopup,
        selectedDate,
        setSelectedDate
    } = useContext(CalendarContext);

    const { handleSearch, handleSubmitEvent, handleEditEvent, handleDeleteEvent, dispatch } = useContext(EventContext);

    const monthsOfYear = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    return (
        <div className="events">
            <input
                className="search"
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e, setSearchParams)}
            />
            {showEventPopup && (
                <EventPopup
                    eventText={eventText}
                    setEventText={setEventText}
                    eventTime={eventTime}
                    handleTimeChange={(e) => {
                        const { name, value } = e.target;
                        setEventTime((prevTime) => ({
                            ...prevTime,
                            [name]: value.padStart(2, '0'),
                        }));
                    }}
                    editingEvent={editingEvent}
                    setShowEventPopup={setShowEventPopup}
                    handleSubmitEvent={() => handleSubmitEvent(editingEvent, selectedDate, eventTime, eventText, dispatch, setEventTime, setEventText, setShowEventPopup, setEditingEvent)}
                />
            )}
            {filteredEvents.map((event) => {
                const eventDate = new Date(event.date);
                return (
                    <div key={event.id} className="event">
                        <div className="event-date-wrapper">
                            <div className="event-date">{`${monthsOfYear[eventDate.getMonth()]} ${eventDate.getDate()} ${eventDate.getFullYear()}`}</div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                            <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event, setSelectedDate, setEventTime, setEventText, setEditingEvent, setShowEventPopup)}></i>
                            <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id, dispatch)}></i>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default EventList;
