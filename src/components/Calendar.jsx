import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext.jsx';
import { EventContext } from '../context/eventContext.jsx';
import { formatDate } from '../utils/helpers.jsx';

// Componente Calendar para mostrar la vista del calendario
const Calendar = () => {
    const {
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        currentDate,
        selectedDate,
        setSelectedDate,
        setShowEventPopup,
        setEventTime,
        setEventText,
        setEditingEvent,
        daysInMonth,
        firstDayOfMonth
    } = useContext(CalendarContext);

    const { events, seePrevMonth, seeNextMonth, seeCurrentMonth, handleDayClick } = useContext(EventContext);

    const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    const monthsOfYear = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    return (
        <div className="calendar">
            <h1 className="heading">Calendario</h1>
            <div className="navigate-date">
                <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                <h2 className="year">{currentYear}</h2>
                <div className="buttons">
                    <i className="bx bxs-arrow-from-top" onClick={() => seeCurrentMonth(setCurrentMonth, setCurrentYear, currentDate)}></i>
                    <i className="bx bx-chevron-left" onClick={() => seePrevMonth(setCurrentMonth, setCurrentYear, currentMonth)}></i>
                    <i className="bx bx-chevron-right" onClick={() => seeNextMonth(setCurrentMonth, setCurrentYear, currentMonth)}></i>
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
                        onClick={() => handleDayClick(day + 1, currentYear, currentMonth, setSelectedDate, setShowEventPopup, setEventTime, setEventText, setEditingEvent)}
                        key={day + 1}
                    >
                        {day + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
