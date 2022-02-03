import { useDispatch, useSelector } from 'react-redux';
import Options from './Options';
import Event from './Event';
import NoEventsMessage from './NoEventsMessage';
import { storeEventId } from '../redux/actions.js';

const EventsContainer = ({ addButtonRef, removeButtonRef, modalRef, confirmationModalRef, overlayRef }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.content);

    // Opens modal when clicking.
    const openModal = () => {
        modalRef.current.classList.add('active');
        overlayRef.current.classList.add('active');
    }

    // Opens confirmation model when clicking on remove event modal.
    const openConfirmationModal = () => {
        confirmationModalRef.current.classList.add('active');
        overlayRef.current.classList.add('active')
    }

    // Enables remove event button when clicking on one of the events.
    const handleRemoveEventBtn = (e) => {
        if (e.target.classList.contains('event')) {
            removeButtonRef.current.classList.add('active');
            dispatch(storeEventId(state, e.target.dataset.id))
        } else {
            removeButtonRef.current.classList.remove('active');
        }
    } 

    return (
        <div className='eventsContainer'>
            <Options 
                addButtonRef={ addButtonRef }
                removeButtonRef={ removeButtonRef }
                openModal={ openModal }
                openConfirmationModal={ openConfirmationModal }
            />
            <div className='events' onClick={ handleRemoveEventBtn }>
                { useSelector(state => state.content.events.length === 0 ? <NoEventsMessage /> : state.content.events.map((event, index) => <Event key={ index } eventId={ event.id } eventName={ event.name } eventDate={ event.timestamp[0] } description={ event.description } />)) }
            </div>
        </div>
    );
}

export default EventsContainer;