import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventPopup = ({
    eventText,
    setEventText,
    eventTime,
    handleTimeChange,
    editingEvent,
    setShowEventPopup,
    handleSubmitEvent,
}) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const element = popupRef.current;
        if (!element) return;

        const header = element.querySelector('.event-popup-header');
        if (!header) return;

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = `${element.offsetTop - pos2}px`;
            element.style.left = `${element.offsetLeft - pos1}px`;
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        header.onmousedown = dragMouseDown;

        return () => {
            header.onmousedown = null;
        };
    }, []);

    return (
        <div className="event-popup" ref={popupRef}>
            <div className="event-popup-header">
                <h2>{editingEvent ? 'Modificar evento' : 'Añadir evento'}</h2>
                <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
                    <i className="bx bx-x"></i>
                </button>
            </div>
            <div className="event-popup-body">
                <div className="time-input">
                    <div className="event-popup-time">Hora</div>
                    <input
                        className="hours"
                        type="number"
                        name="hours"
                        min={0}
                        max={23}
                        value={eventTime.hours}
                        onChange={handleTimeChange}
                    />
                    <input
                        className="minutes"
                        type="number"
                        name="minutes"
                        min={0}
                        max={59}
                        value={eventTime.minutes}
                        onChange={handleTimeChange}
                    />
                </div>
                <textarea
                    name="event"
                    placeholder="Introduzca la descripción del evento (máximo 60 caracteres)."
                    value={eventText}
                    onChange={(e) => {
                        if (e.target.value.length <= 60) setEventText(e.target.value);
                    }}
                />
                <div className="character-counter">
                    {60 - eventText.length} caracteres restantes
                </div>
                <button className="event-popup-btn" onClick={handleSubmitEvent}>
                    Confirmar
                </button>
            </div>
        </div>
    );
};

EventPopup.propTypes = {
    eventText: PropTypes.string.isRequired,
    setEventText: PropTypes.func.isRequired,
    eventTime: PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
    }).isRequired,
    handleTimeChange: PropTypes.func.isRequired,
    editingEvent: PropTypes.bool.isRequired,
    setShowEventPopup: PropTypes.func.isRequired,
    handleSubmitEvent: PropTypes.func.isRequired,
};

export default EventPopup;