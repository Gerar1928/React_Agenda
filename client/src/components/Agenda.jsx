import Calendar from './Calendar';
import EventsContainer from './EventsContainer';

export default function Agenda({ addButtonRef, removeButtonRef, modalRef, confirmationModalRef, overlayRef }) {
    return (
        <div id='agenda'>
            <Calendar 
                addButtonRef={ addButtonRef } 
                removeButtonRef={ removeButtonRef }
            />
            <EventsContainer 
                addButtonRef={ addButtonRef } 
                removeButtonRef={ removeButtonRef } 
                modalRef={ modalRef } 
                confirmationModalRef={ confirmationModalRef } 
                overlayRef={ overlayRef }
            />
        </div>
    );
}