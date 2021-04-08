import Button from './Button';

const Modal = ({ modalRef, overlayRef }) => {

    // const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <>
            <div className='modal' ref={ modalRef }>
                <h1>Add Event</h1>
                <form action='POST'>
                    <label>Name</label>
                    <input type='text' name='event-name' required/>
                    <label>Month</label>
                    <input type='number'/>
                    <label>Day</label>
                    <input type='number'/>
                    <label>Year</label>
                    <input type='text'/>
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