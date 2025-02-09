import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { EventProvider } from './context/eventContext';
import CalendarApp from './CalendarApp';
import Lotties from './components/lotties';

const App = () => {
  return (
    <Router>
      <EventProvider>
        <Routes>
          <Route path="/" element={<CalendarApp />} />
          <Route path="/lotties" element={<Lotties />} />
        </Routes>
      </EventProvider>
    </Router>
  );
};

export default App;