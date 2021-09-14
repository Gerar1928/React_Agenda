import { useSelector } from 'react-redux';
import Button from './Button';

const Modal = ({ modalRef, overlayRef }) => {

    // Removes active class when clicking on overlay.
    const handleOverlayEvent = () => {
        overlayRef.current.classList.remove('active');
        modalRef.current.classList.remove('active')
    } 

    return (
        <>
            <div className='modal' ref={ modalRef }>
                <h1>Add Event</h1>
                <form action='POST'>
                    <label>Name</label>
                    <input type='text' name='event-name' required/>
                    <label>Month</label>
                    <input type='text' value={ useSelector(state => state.content.month) } readOnly/>
                    <label>Day</label>
                    <input type='number' value={ useSelector(state => state.content.daySelected) } readOnly/>
                    <label>Year</label>
                    <input type='number' value= { useSelector(state => state.content.year) } readOnly/>
                    <label>Description</label>
                    <textarea name='event-description' required></textarea>
                    <Button action={ 'Submit Event' }/>
                </form>
            </div>
            <div className='overlay' ref={ overlayRef } onClick={ handleOverlayEvent }></div>
        </>
    );
};

export default Modal;