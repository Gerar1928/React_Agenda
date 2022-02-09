import { useDispatch, useSelector } from "react-redux";
import { updateEvents } from "../redux/actions";

export default function ConfirmationModal({ overlayRef, removeButtonRef, confirmationModalRef }) {
    const dispatch = useDispatch();
    let selectedId = useSelector(state => state.eventsContent.eventSelectedId);
    let selectedEvent = useSelector(state => state.eventsContent.events.find(e => e.id === selectedId));
    const newArrOfEvents = useSelector(state => state.eventsContent.events.filter(e => e.id !== selectedId));
    const state = useSelector(state => state);

    const removeEvent = async (e) => {
        e.preventDefault();

        try {
            const init = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation {
                        remove_event(id: "${ selectedId }") {
                            id
                      }
                    }`
                })
            }
        
            await fetch('http://localhost:9000/graphql', init);
            dispatch(updateEvents('REMOVE_EVENT', state, newArrOfEvents))
        } catch (err) {
            console.log(err);
        } finally {
            removeButtonRef.current.classList.remove('active');
            overlayRef.current.classList.remove('active');
            confirmationModalRef.current.classList.remove('active');
        }
    }

    return (
        <div className='confirmation-modal' ref={ confirmationModalRef }>
            <form method='POST' onSubmit={ removeEvent }>
                <label>Are you sure you want to remove { selectedEvent ? selectedEvent.name : ' '} event?</label>
                <input type="submit" value="Yes, remove event."/>
            </form>
        </div>
    );
}