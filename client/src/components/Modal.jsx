import { useSelector } from 'react-redux';
import Button from './Button';

const Modal = ({ modalRef, overlayRef }) => {
    return (
        <>
            <div className='modal' ref={ modalRef }>
                <h1>Add Event</h1>
                <form action='POST'>
                    <label>Name</label>
                    <input type='text' name='event-name' required/>
                    <label>Month</label>
                    <input type='text' value={ useSelector(store => store.content.month) }readOnly/>
                    <label>Day</label>
                    <input type='number' value={ useSelector(store => store.content.daySelected) } readOnly/>
                    <label>Year</label>
                    <input type='number' value= { useSelector(store => store.content.fullYear) } readOnly/>
                    <label>Description</label>
                    <textarea name='event-description' required></textarea>
                    <Button action={ 'Submit Event' }/>
                </form>
            </div>
            <div className='overlay' ref={ overlayRef } onClick={ () => {
                overlayRef.current.classList.remove('active');
                modalRef.current.classList.remove('active')
            } }></div>
        </>
    );
};

export default Modal;