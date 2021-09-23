import Date from './Date';
import WeekdaysContainer from './WeekdaysContainer';
import DaysContainer from './DaysContainer';

const Calendar = ({ addButtonRef, removeButtonRef }) => {

    return (
        <div className='calendar'>
            <Date addButtonRef={ addButtonRef } removeButtonRef={ removeButtonRef }/>
            <WeekdaysContainer />
            <DaysContainer addButtonRef={ addButtonRef }/>
        </div>
    );
};

export default Calendar; 