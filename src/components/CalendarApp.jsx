import { useState } from "react"

const CalendarApp = () => {
    const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
    //const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const currentDate = new Date();
    const [currentMonth, /* setCurrentMonth */] = useState(currentDate.getMonth());
    const [currentYear, /* setCurrentYear */] = useState(currentDate.getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    console.log(daysInMonth, firstDayOfMonth);





    return (
        <div className="calendar-app">
            <div className="calendar">
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">May,</h2>
                    <h2 className="year">2025</h2>
                    <div className="buttons">
                        <i className="bx bx-chevron-left"></i>
                        <i className="bx bx-chevron-right"></i>
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
                        <span key={day + 1}>{day + 1}</span>
                    ))}
                </div>
            </div>
            <div className="events">
                <div className="event-popup">
                    <div className="time-input">
                        <div className="event-popup-time">Time</div>
                        <input className="hours" type="number" name="hours" min={0} max={23} />
                        <input className="minutes" type="number" name="minutes" min={0} max={59} />
                    </div>
                    <textarea name="event" id="" placeholder="Enter event text (max 60 characters)"></textarea>
                    <button className="event-popup-btn">Add Event</button>
                    <button className="close-event-popup"><i className="bx bx-x"></i></button>
                </div>
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