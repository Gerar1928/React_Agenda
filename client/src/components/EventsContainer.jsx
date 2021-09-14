import Button from './Button';
import Event from './Event';

const EventsContainer = ({ addButtonRef, modalRef, overlayRef }) => {

    // Opens modal when clicking.
    const openModal = () => {
        modalRef.current.classList.add('active');
        overlayRef.current.classList.add('active');
    }

    return (
        <div className='eventsContainer'>
            <div className='options'>
                <div className='options-header'>
                    <h1>Event Options</h1>
                </div>
                <Button action='Show events' buttonClass='show-events'/>
                <Button action='Add event' buttonClass='add-event' btnRef={ addButtonRef } handleClick={ openModal } />
                <Button action='Remove event' buttonClass='remove-event'/>
            </div>
            <div className='events'>
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
            </div>
        </div>
    );
};

export default EventsContainer;