import { useSelector } from 'react-redux';
import Event from './Event';
import NoEventsMessage from './NoEventsMessage';

export default function Events({ handleRemoveEventBtn }) {
    return (
        <div className='events' onClick={ handleRemoveEventBtn }>
            { useSelector(state => state.eventsContent.events.length === 0 
                ? <NoEventsMessage /> 
                : state.content.events.map((event, index) => <Event 
                                                                key={ index } 
                                                                eventId={ event.id } 
                                                                eventName={ event.name } 
                                                                eventDate={ event.timestamp[0] } 
                                                                description={ event.description } 
                                                             />))
            }
        </div>
    );
}