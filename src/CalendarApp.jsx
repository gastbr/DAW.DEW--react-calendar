import { useState, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventPopup from './components/eventPopup';
import { EventContext } from './context/eventContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';
import { formatDate, isSameDay } from './utils/helpers';
import { Pokemons } from './components/pokemons';
import Footer from './components/footer';
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Atlantic/Canary');

const CalendarApp = () => {
    const { events, dispatch } = useContext(EventContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    const monthsOfYear = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
    const [eventText, setEventText] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);

    const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentYear, currentMonth]);
    const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 0).getDay(), [currentYear, currentMonth]);

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            event.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [events, searchQuery]);

    const handleSearch = (e) => {
        setSearchParams({ search: e.target.value });
    };
    const seePrevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const seeNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };

    const seeCurrentMonth = () => {
        setCurrentMonth(currentDate.getMonth());
        setCurrentYear(currentDate.getFullYear());
    };

    const handleDayClick = (day) => {
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

    const handleSubmitEvent = () => {
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

    const handleEditEvent = (event) => {
        setSelectedDate(new Date(event.date));
        setEventTime({
            hours: event.time.split(':')[0],
            minutes: event.time.split(':')[1],
        });
        setEventText(event.text);
        setEditingEvent(event);
        setShowEventPopup(true);
    };

    const handleDeleteEvent = (eventId) => {
        dispatch({ type: 'DELETE_EVENT', payload: eventId });
    };

    return (
        <>
            <Pokemons />
            <div className="calendar-app">
                <div className="calendar">
                    <h1 className="heading">Calendario</h1>
                    <div className="navigate-date">
                        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                        <h2 className="year">{currentYear}</h2>
                        <div className="buttons">
                            <i className="bx bxs-arrow-from-top" onClick={seeCurrentMonth}></i>
                            <i className="bx bx-chevron-left" onClick={seePrevMonth}></i>
                            <i className="bx bx-chevron-right" onClick={seeNextMonth}></i>
                        </div>
                    </div>
                    <div className="weekdays">
                        {daysOfWeek.map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>
                    <div className="days">
                        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                            <span key={`empty-${index}`} />
                        ))}
                        {[...Array(daysInMonth).keys()].map((day) => (
                            <span
                                className={formatDate(new Date(currentYear, currentMonth, day + 1), selectedDate, currentDate, events)}
                                onClick={() => handleDayClick(day + 1)}
                                key={day + 1}
                            >
                                {day + 1}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="events">
                    <input
                        className="search"
                        type="text"
                        placeholder="Buscar eventos..."
                        value={searchQuery}
                        onChange={handleSearch}
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
                            handleSubmitEvent={handleSubmitEvent}
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
                                    <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
                                    <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CalendarApp;