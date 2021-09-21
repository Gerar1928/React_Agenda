import './App.scss';
import { useRef } from 'react';
import Calendar from './components/Calendar';
import EventsContainer from './components/EventsContainer';
import Modal from './components/Modal';

const App = () => {

    // Refs
    const addButtonRef = useRef(null);
    const removeButtonRef = useRef(null);
    const modalRef = useRef(null);
    const confirmationModalRef = useRef(null);
    const overlayRef = useRef(null);

    return (
        <div className='main-container' >
            <div className='secondary-container'>
                <Calendar addButtonRef={ addButtonRef }/>
                <EventsContainer addButtonRef={ addButtonRef } removeButtonRef={ removeButtonRef } modalRef={ modalRef } confirmationModalRef={ confirmationModalRef } overlayRef={ overlayRef }/>
            </div>
            <Modal modalRef={ modalRef } overlayRef={ overlayRef } confirmationModalRef={ confirmationModalRef } addButtonRef={ addButtonRef } removeButtonRef={ removeButtonRef }/>
        </div>
    );
}

export default App;