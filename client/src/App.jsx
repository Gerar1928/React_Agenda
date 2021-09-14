import './App.scss';
import { useRef } from 'react';
import Calendar from './components/Calendar';
import EventsContainer from './components/EventsContainer';
import Modal from './components/Modal';


const App = () => {

    const testGraphql = async () => {
        const res = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query {
                    event {
                      id
                      name
                      description
                      timestamp {
                        date
                        day
                        month
                        year
                      }
                    }
                  }`
            })
        });
        const data = await res.json();

        console.log(data);
    }

    testGraphql();

    const addButtonRef = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    return (
        <div className='main-container' >
            <div className='secondary-container'>
                <Calendar addButtonRef={ addButtonRef }/>
                <EventsContainer addButtonRef={ addButtonRef } modalRef={ modalRef } overlayRef={ overlayRef }/>
            </div>
            <Modal modalRef={ modalRef } overlayRef={ overlayRef }/>
        </div>
    );
};

export default App;