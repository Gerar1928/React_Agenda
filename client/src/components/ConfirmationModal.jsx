import { useDispatch, useSelector } from "react-redux";
import { updateEvents } from "../redux/actions";

const ConfirmationModal = ({ overlayRef, removeButtonRef, confirmationModalRef }) => {
    const dispatch = useDispatch();
    let selectedId = useSelector(state => state.content.eventSelectedId);
    let selectedEvent = useSelector(state => state.content.events.find(e => e.id === selectedId));
    const newArrOfEvents = useSelector(state => state.content.events.filter(e => e.id !== selectedId));
    const state = useSelector(state => state.content);

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
                <label>Are you sure you want to remove { selectedEvent ? selectedEvent.name : ' '} this event?</label>
                <input type="submit" value="Yes, remove event."/>
            </form>
        </div>
    );
}

export default ConfirmationModal;