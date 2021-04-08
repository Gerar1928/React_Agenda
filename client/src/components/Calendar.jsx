import Date from './Date';
import WeekdaysContainer from './WeekdaysContainer';
import DaysContainer from './DaysContainer';

const Calendar = ({ addBtnRef }) => {

    return (
        <div className='calendar'>
            <Date />
            <WeekdaysContainer />
            <DaysContainer addBtnRef={ addBtnRef }/>
        </div>
    );
};

export default Calendar; 