import { useSelector } from 'react-redux';
import Day from './Day';

const DaysContainer = ({ addBtnRef }) => {

    const { prevMonthDays, currentMonthDays, nextMotnhDays } = useSelector(state => state.content.days);

    return (
        <div className = 'daysContainer' onClick={ (e) => {
            if (e.target.classList.contains('currentMonth')) {
                addBtnRef.current.classList.add('active');
            } else {
                addBtnRef.current.classList.remove('active');
            }
        } }>
            { prevMonthDays.map((dayObj, index) => <Day key={ index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo='prevMonth'/>) }
            { currentMonthDays.map((dayObj, index) => <Day key= { index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo='currentMonth'/>) }
            { nextMotnhDays.map((dayObj, index) => <Day key={ index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo='nextMonth'/>) }
        </div>
    );
};

export default DaysContainer;