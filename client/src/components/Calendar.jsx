import Date from './Date';
import WeekdaysContainer from './WeekdaysContainer';
import DaysContainer from './DaysContainer';

const Calendar = ({ addButtonRef }) => {

    return (
        <div className='calendar'>
            <Date />
            <WeekdaysContainer />
            <DaysContainer addButtonRef={ addButtonRef }/>
        </div>
    );
};

export default Calendar; 