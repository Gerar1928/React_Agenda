import Button from './Button';
import Event from './Event';

const EventsContainer = () => {

    const buttonTypes = [
        {
            action: 'Show events',
            className: 'show-events'
        },
        {
            action: 'Add event',
            className: 'add-event'
        },
        {
            action: 'Remove event',
            className: 'remove-event'
        }
    ];

    return (
        <div className='eventsContainer'>
            <div className='options'>
                <div className='options-header'>
                    <h1>Event Options</h1>
                </div>
                { buttonTypes.map((buttonType, index) => <Button action={ buttonType.action } buttonClass={ buttonType.className } key={ index }/>) }
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