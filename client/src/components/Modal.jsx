import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import { monthsArr } from '../common/months.js';
import { updateEvents } from '../redux/actions.js';

const Modal = ({ modalRef, overlayRef, confirmationModalRef, addButtonRef, removeButtonRef }) => {

    const dispatch = useDispatch();
    const arrOfEvents = useSelector(state => state.eventsContent.events);
    const state = useSelector(state => state);
    
    // Adds event to database and updates store.
    const addEvent = async (e) => {
        e.preventDefault();

        const eventDate = new Date(Number(e.target.year.value), monthsArr.indexOf(e.target.month.value), Number(e.target.day.value));

        try {
            const event = {
                id: String(Date.now()),
                name: e.target.elements['event-name'].value,
                description: e.target.elements['event-description'].value,
                timestamp: [{
                    day: eventDate.getDate(),
                    month: e.target.month.value,
                    year: eventDate.getFullYear()
                }]
            }
    
            const init = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation {
                        add_event(id: "${event.id}", name: "${event.name}", description: "${event.description}", day: ${event.timestamp[0].day}, month: ${eventDate.getMonth()}, year: ${event.timestamp[0].year}) {
                            id
                        }
                    }`
                })
            }
        
            await fetch('http://localhost:9000/graphql', init);
            arrOfEvents.push(event);
            dispatch(updateEvents('ADD_EVENT', state, arrOfEvents));
        } catch (err) {
            console.log(err);
        } finally {
            modalRef.current.classList.remove('active');
            overlayRef.current.classList.remove('active');
            addButtonRef.current.classList.remove('active');
    
            // Clears the inputs fields.
            e.target.reset();
        }
    }

    // Removes active class when clicking on overlay.
    const handleOverlayEvent = () => {
        if (modalRef.current.classList.contains('active')) {
            modalRef.current.classList.remove('active');
        } else if (confirmationModalRef.current.classList.contains('active')) {
            confirmationModalRef.current.classList.remove('active');
        }
        overlayRef.current.classList.remove('active');
    } 

    return (
        <>
            <div className='modal' ref={ modalRef } onSubmit={ addEvent }>
                <h1>Add Event</h1>
                <form method='POST'>
                    <label>Name</label>
                    <input type='text' name='event-name' required/>
                    <label>Month</label>
                    <input type='text' name='month' value={ useSelector(state => state.eventsContent.month) } readOnly/>
                    <label>Day</label>
                    <input type='number' name='day' value={ useSelector(state => state.eventsContent.daySelected) } readOnly/>
                    <label>Year</label>
                    <input type='number' name='year' value= { useSelector(state => state.eventsContent.year) } readOnly/>
                    <label>Description</label>
                    <textarea name='event-description' required></textarea>
                    <Button action={ 'Submit Event' }/>
                </form>
            </div>
            <ConfirmationModal overlayRef={ overlayRef } removeButtonRef={ removeButtonRef } confirmationModalRef={ confirmationModalRef }/>
            <div className='overlay' ref={ overlayRef } onClick={ handleOverlayEvent }></div>
        </>
    );
}

export default Modal;