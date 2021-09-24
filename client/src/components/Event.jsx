import { monthsArr } from '../redux/initial_state.js';

const Event = ({ eventId, eventName, eventDate, description }) => {

    // Converts date to string.
    const dateStr = new Date (eventDate.year, monthsArr.indexOf(eventDate.month), eventDate.day)
        .toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className='event' data-id={ eventId } >
            <div className='event-information'>
                <h3>{ eventName }</h3>
                <h4>{ dateStr }</h4>
            </div>
            <div className='event-description'>
                <p>{ description }</p>
            </div>
        </div>
    );
}

export default Event;