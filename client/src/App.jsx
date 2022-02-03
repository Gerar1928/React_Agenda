import './App.scss';
import { useRef } from 'react';
import Agenda from './components/Agenda';
import Modal from './components/Modal';

const App = () => {

    // Refs
    const addButtonRef = useRef(null);
    const removeButtonRef = useRef(null);
    const modalRef = useRef(null);
    const confirmationModalRef = useRef(null);
    const overlayRef = useRef(null);

    return (
        <div>
            <Agenda 
                addButtonRef={ addButtonRef } 
                removeButtonRef={ removeButtonRef } 
                modalRef={ modalRef } 
                confirmationModalRef={ confirmationModalRef } 
                overlayRef={ overlayRef } 
            />
            <Modal modalRef={ modalRef } 
                overlayRef={ overlayRef } 
                confirmationModalRef={ confirmationModalRef } 
                addButtonRef={ addButtonRef } 
                removeButtonRef={ removeButtonRef }
            />
        </div>
    );
}

export default App;