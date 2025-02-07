import { useState } from "react"
import EventPopup from "./eventPopup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/es';
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Atlantic/Canary');

const CalendarApp = () => {
    const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
    const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
    const [eventText, setEventText] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();

    const seePrevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const seeNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const seeCurrentMonth = () => {
        setCurrentMonth(currentDate.getMonth());
        setCurrentYear(currentDate.getFullYear());
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
            setEventTime({ hours: '00', minutes: '00' });
            setEventText('');
            setEditingEvent(null);
        }
    }

    const handleSubmitEvent = () => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: eventText,
        };

        let updatedEvents = [...events];

        if (editingEvent) {
            updatedEvents = updatedEvents.map((event) =>
                event.id === editingEvent.id ? newEvent : event,
            );
        } else {
            updatedEvents.push(newEvent);
        }

        updatedEvents.sort((a, b) => {
            new Date(a.date) - new Date(b.date);
        })

        setEvents(updatedEvents);
        setEventTime({ hours: '00', minutes: '00' });
        setEventText('');
        setShowEventPopup(false);
        setEditingEvent(null);
    }

    const handleEditEvent = (event) => {
        setSelectedDate(new Date(event.date));
        setEventTime({
            hours: event.time.split(':')[0],
            minutes: event.time.split(':')[1],
        });
        setEventText(event.text);
        setEditingEvent(event);
        setShowEventPopup(true);
    }

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
    }

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setEventTime((prevTime) => ({
            ...prevTime,
            [name]: value.padStart(2, '0'),
        }));
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    const formatDate = (day) => {
        let className = "";
        if (isSameDay(new Date(currentYear, currentMonth, day + 1), selectedDate)) {
            className = "selected-day";
        }
        if (isSameDay(new Date(currentYear, currentMonth, day + 1), currentDate)) {
            className = "current-day";
        }
        return className;
    }

    return (
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
                        <span className={formatDate(day)} onClick={() => handleDayClick(day + 1)} key={day + 1}>{day + 1}</span>
                    ))}
                </div>
            </div>
            <div className="events">
                {showEventPopup && (
                    <EventPopup
                        eventText={eventText}
                        setEventText={setEventText}
                        eventTime={eventTime}
                        handleTimeChange={handleTimeChange}
                        editingEvent={editingEvent}
                        setShowEventPopup={setShowEventPopup}
                        handleSubmitEvent={handleSubmitEvent}
                    />
                )}
                {events.map((event, index) => (
                    <div key={index} className="event">
                        <div className="event-date-wrapper">
                            <div className="event-date">{`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()} ${event.date.getFullYear()}`}</div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                            <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
                            <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarApp