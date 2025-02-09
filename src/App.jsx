import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { EventProvider } from './context/eventContext';
import CalendarApp from './CalendarApp';

const App = () => {
  return (
    <Router>
      <EventProvider>
        <Routes>
          <Route path="/DAW.DEW--react-calendar/" element={<CalendarApp />} />
        </Routes>
      </EventProvider>
    </Router>
  );
};

export default App;