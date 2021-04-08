import './App.scss';
import { useRef } from 'react';
import Calendar from './components/Calendar';
import EventsContainer from './components/EventsContainer';
import Modal from './components/Modal';


const App = () => {

    const addBtnRef = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    return (
        <div className='main-container' >
            <div className='secondary-container'>
                <Calendar addBtnRef={ addBtnRef }/>
                <EventsContainer addBtnRef={ addBtnRef } modalRef={ modalRef } overlayRef={ overlayRef }/>
            </div>
            <Modal modalRef={ modalRef } overlayRef={ overlayRef }/>
        </div>
    );
};

export default App;