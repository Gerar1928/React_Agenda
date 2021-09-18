const Event = ({ eventId, eventName, eventDate, description  }) => {
    return (
        <div className='event' data-id={ eventId } >
            <div className='event-information'>
                <h3>{ eventName }</h3>
                <h4>Wed, April 7, 2021</h4>
            </div>
            <div className='event-description'>
                <p>{ description }</p>
            </div>
        </div>
    );
}

export default Event;