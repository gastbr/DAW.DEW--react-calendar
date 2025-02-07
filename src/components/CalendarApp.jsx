import { useState } from "react"
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

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
        }
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    return (
        <div className="calendar-app">
            <div className="calendar">
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]}</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <i className="bx bx-chevron-left" onClick={prevMonth}></i>
                        <i className="bx bx-chevron-right" onClick={nextMonth}></i>
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
                        <span className={
                            day + 1 === currentDate.getDate() &&
                                currentMonth === currentDate.getMonth() &&
                                currentYear === currentDate.getFullYear()
                                ? "current-day"
                                : ""
                        } onClick={() => handleDateClick(day + 1)} key={day + 1}>{day + 1}</span>
                    ))}
                </div>
            </div>
            <div className="events">
                {showEventPopup && (
                    <div className="event-popup">
                        <div className="time-input">
                            <div className="event-popup-time">Time</div>
                            <input className="hours" type="number" name="hours" min={0} max={23} />
                            <input className="minutes" type="number" name="minutes" min={0} max={59} />
                        </div>
                        <textarea name="event" id="" placeholder="Enter event text (max 60 characters)"></textarea>
                        <button className="event-popup-btn">Add Event</button>
                        <button className="close-event-popup" onClick={() => setShowEventPopup(false)}><i className="bx bx-x"></i></button>
                    </div>
                )}

                <div className="event">
                    <div className="event-date-wrapper">
                        <div className="event-date">May 15, 2025</div>
                        <div className="event-time">10:00</div>
                    </div>
                    <div className="event-text">Meeting with John</div>
                    <div className="event-buttons">
                        <i className="bx bxs-edit-alt"></i>
                        <i className="bx bxs-message-alt-x"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarApp