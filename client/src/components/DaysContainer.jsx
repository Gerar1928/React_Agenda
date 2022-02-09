import { useSelector } from 'react-redux';
import Day from './Day';

const DaysContainer = ({ addButtonRef }) => {

    const { prevMonthDays, currentMonthDays, nextMonthDays } = useSelector(state => state.calendarContent.days);
  
    const handleAddEventBtn = (e) => {
        if (!e.target.classList.contains('currentMonth')) {
            addButtonRef.current.classList.remove('active');
        } else {
            addButtonRef.current.classList.add('active');
        }
    }

    return (
        <div className = 'daysContainer' onClick={ handleAddEventBtn }>
            { prevMonthDays.map((day_obj, index) => <Day key={ index } day={ day_obj.day } isWeekend={ day_obj.isWeekend } belongTo='prevMonth'/>) }
            { currentMonthDays.map((day_obj, index) => <Day key= { index } day={ day_obj.day } isWeekend={ day_obj.isWeekend } belongTo='currentMonth'/>) }
            { nextMonthDays.map((day_obj, index) => <Day key={ index } day={ day_obj.day } isWeekend={ day_obj.isWeekend } belongTo='nextMonth'/>) }
        </div>
    );
};

export default DaysContainer;