import { useMemo, useContext, useState, useEffect } from 'react';
import { EventContext } from './context/eventContext.jsx';
import { CalendarProvider, CalendarContext } from './context/CalendarContext.jsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';
import { Pokemons } from './components/pokemons.jsx';
import Footer from './components/footer.jsx';
import Calendar from './components/Calendar.jsx';
import EventList from './components/EventList.jsx';

dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Atlantic/Canary');

// Componente principal de la aplicación
const CalendarApp = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsLoaded(true);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (!isLoaded) {
        return <div className="text-center loading mt-10 text-2xl text-stone-500 font-bold">Cargando calendario...</div>;
    }

    return (
        <CalendarProvider>
            <CalendarAppContent />
        </CalendarProvider>
    );
};

// Componente de contenido para CalendarApp
const CalendarAppContent = () => {
    const { events } = useContext(EventContext);
    const { searchQuery, setEditingEvent } = useContext(CalendarContext);

    // Filtrar eventos en función de la consulta de búsqueda
    const filteredEvents = useMemo(() => {
        if (!events) return [];
        return events.filter((event) =>
            event.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [events, searchQuery]);

    return (
        <>
            <Pokemons />
            <div className="calendar-app">
                <Calendar />
                <EventList filteredEvents={filteredEvents} setEditingEvent={setEditingEvent} />
            </div>
            <Footer />
        </>
    );
};

export default CalendarApp;