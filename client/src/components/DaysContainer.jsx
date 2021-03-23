import { useSelector } from 'react-redux';
import Day from './Day';

const DaysContainer = () => {
    
    const { prevMonthDays, currentMonthDays, nextMotnhDays } = useSelector(state => state.content.days);

    return (
        <div className = 'daysContainer'>
            { prevMonthDays.map((dayObj, index) => <Day key={ index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo='prevMonth'/>) }
            { currentMonthDays.map((dayObj, index) => <Day key= { index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo=''/>) }
            { nextMotnhDays.map((dayObj, index) => <Day key={ index } day={ dayObj.day } isWeekend={ dayObj.weekend } belongTo='nextMonth'/>) }
        </div>
    );
};

export default DaysContainer;