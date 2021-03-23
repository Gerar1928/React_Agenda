import Date from './Date';
import WeekdaysContainer from './WeekdaysContainer';
import DaysContainer from './DaysContainer';

const Calendar = () => {

    return (
        <div className='calendar'>
            <Date />
            <WeekdaysContainer />
            <DaysContainer />
        </div>
    );
};

export default Calendar; 