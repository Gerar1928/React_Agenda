import Button from './Button';

export default function Options({ addButtonRef, removeButtonRef, openModal, openConfirmationModal }) {
    return (
        <div className='options'>
            <div className='options-header'>
                <h1>Event Options</h1>
            </div>
            <Button action='Add event' buttonClass='add-event' btnRef={ addButtonRef } handleClick={ openModal } />
            <Button action='Remove event' buttonClass='remove-event' btnRef={ removeButtonRef } handleClick={ openConfirmationModal }/>
        </div>
    );
}