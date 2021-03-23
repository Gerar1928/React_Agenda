import './App.scss';
import Header from './components/Header';
import Calendar from './components/Calendar';
import EventsContainer from './components/EventsContainer';


const App = () => {
    return (
        <>
            <Calendar />
            <EventsContainer />
        </>
    );
};

export default App;