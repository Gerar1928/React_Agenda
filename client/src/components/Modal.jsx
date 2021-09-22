import { useSelector } from 'react-redux';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import { monthsArr } from '../redux/initial_state.js';

const Modal = ({ modalRef, overlayRef, confirmationModalRef, addButtonRef, removeButtonRef }) => {

    const arrOfEvents = useSelector(state => state.content.events);
    console.log(arrOfEvents);

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
                <form action='POST'>
                    <label>Name</label>
                    <input type='text' name='event-name' required/>
                    <label>Month</label>
                    <input type='text' name='month' value={ useSelector(state => state.content.month) } readOnly/>
                    <label>Day</label>
                    <input type='number' name='day' value={ useSelector(state => state.content.daySelected) } readOnly/>
                    <label>Year</label>
                    <input type='number' name='year' value= { useSelector(state => state.content.year) } readOnly/>
                    <label>Description</label>
                    <textarea name='event-description' required></textarea>
                    <Button action={ 'Submit Event' }/>
                </form>
            </div>
            <ConfirmationModal removeButtonRef={ removeButtonRef } confirmationModalRef={ confirmationModalRef }/>
            <div className='overlay' ref={ overlayRef } onClick={ handleOverlayEvent }></div>
        </>
    );
}

export default Modal;