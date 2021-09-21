const ConfirmationModal = ({ removeButtonRef, confirmationModalRef }) => {
    return (
        <div className='confirmation-modal' ref={ confirmationModalRef }>
            <form method="DELETE">
                <label>Are you sure you want to remove this event?</label>
                <input type="submit" value="Yes, remove event."/>
            </form>
        </div>
    );
}

export default ConfirmationModal;