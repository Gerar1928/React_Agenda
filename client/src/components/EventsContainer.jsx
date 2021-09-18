import { useSelector } from 'react-redux';
import Button from './Button';
import Event from './Event';

const EventsContainer = ({ addButtonRef, modalRef, overlayRef }) => {
    const arrOfEvents = useSelector(state => state.content.events);

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
                { arrOfEvents.map((event, index) => <Event key={ index } eventId={ event.id } eventName={ event.name } eventDate={ event.timestamp[0] } description={ event.description } />) }
            </div>
        </div>
    );
}

export default EventsContainer;