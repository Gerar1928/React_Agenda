import { useSelector, useDispatch } from 'react-redux';
import { updateDateString } from '../redux/actions.js';

const Day = ({ day, isWeekend, belongTo }) => {
    const store = useSelector(store => store.content);  
    const dispatch = useDispatch();

    const updateDate = (e) => {
        const daySelected = +e.target.textContent;
        const month = store.monthIndex;
        const year = store.fullYear;

        if (e.target.classList.contains('prevMonth')) {
            if (month === 0) {
                const date = new Date((year - 1), 11, daySelected);
                const dateString = date.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
                dispatch(updateDateString(store, 0, dateString)); 
            } else {
                const date = new Date(year, (month - 1), +e.target.textContent);
                const dateString = date.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
                dispatch(updateDateString(store, 0, dateString));
            }   
        } else if (e.target.classList.contains('nextMonth')) {
            if (month === 11) {
                const date = new Date((year + 1), 0, daySelected);
                const dateString = date.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
                dispatch(updateDateString(store, 0, dateString));
            } else {
                const date = new Date(year, (month + 1), daySelected);
                const dateString = date.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
                dispatch(updateDateString(store, 0, dateString));
            }
        } else {
            const date = new Date(year, month, daySelected);
            const dateString = date.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
            dispatch(updateDateString(store, daySelected, dateString));
        }
        
    };

    return (
        <div className={ `day ${ isWeekend ? 'weekend' : 'NotWeekend' } ${ belongTo }` } onClick={ updateDate }>
            <h3>{ day }</h3>
        </div>
    );
};

export default Day