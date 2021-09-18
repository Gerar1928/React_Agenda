import { useSelector } from 'react-redux';
import Button from './Button';
import Event from './Event';
import NoEventsMessage from './NoEventsMessage';

const EventsContainer = ({ addButtonRef, removeButtonRef, modalRef, overlayRef }) => {
    const arrOfEvents = useSelector(state => state.content.events);

    // Opens modal when clicking.
    const openModal = () => {
        modalRef.current.classList.add('active');
        overlayRef.current.classList.add('active');
    }

    const handleRemoveEventBtn = (e) => {
        if (e.target.classList.contains('event')) {
            removeButtonRef.current.classList.add('active');
        } else {
            removeButtonRef.current.classList.remove('active');
        }
    } 

    return (
        <div className='eventsContainer'>
            <div className='options'>
                <div className='options-header'>
                    <h1>Event Options</h1>
                </div>
                <Button action='Add event' buttonClass='add-event' btnRef={ addButtonRef } handleClick={ openModal } />
                <Button action='Remove event' buttonClass='remove-event' btnRef={ removeButtonRef }/>
            </div>
            <div className='events' onClick={ handleRemoveEventBtn }>
                { arrOfEvents.length === 0 ? <NoEventsMessage /> : arrOfEvents.map((event, index) => <Event key={ index } eventId={ event.id } eventName={ event.name } eventDate={ event.timestamp[0] } description={ event.description } />) }
            </div>
        </div>
    );
}

export default EventsContainer;