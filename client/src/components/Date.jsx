import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { moveBetweenMonths, dispatchCurrentMonthEvents } from '../redux/actions.js';
import { monthsArr } from '../common/months.js';

export default function Date({ addButtonRef, removeButtonRef }) {
    useSelector(store => console.log(store))

    const monthIndex = useSelector(store => store.calendarContent.monthIndex);
    const year = useSelector(store => store.calendarContent.year);
    const dateString = useSelector(store => store.calendarContent.localeDateString);
    const dispatch = useDispatch();

    const handleButtons = () => {
        if (addButtonRef.current.classList.contains('active') && removeButtonRef.current.classList.contains('active')) {
            addButtonRef.current.classList.remove('active');
            removeButtonRef.current.classList.remove('active');
        } else if (addButtonRef.current.classList.contains('active')) {
            addButtonRef.current.classList.remove('active');
        } else if (removeButtonRef.current.classList.remove('active')) {
            removeButtonRef.current.classList.remove('active');
        }
    }

    const goToNextMonth = async () => {
        if (monthIndex === 11) {
            dispatch(dispatchCurrentMonthEvents('NEXT_MONTH', year + 1, 0, moveBetweenMonths));
        } else {
            dispatch(dispatchCurrentMonthEvents('NEXT_MONTH', year, monthIndex + 1, moveBetweenMonths))
        }
        handleButtons();
    }

    const goToPrevtMonth = () => {
        if (monthIndex === 0) {
            dispatch(dispatchCurrentMonthEvents('PREVIOUS_MONTH', year - 1, 11, moveBetweenMonths));
        } else {
            dispatch(dispatchCurrentMonthEvents('PREVIOUS_MONTH', year, monthIndex - 1, moveBetweenMonths));
        }
        handleButtons();
    }

    return (
        <div className ='date'>
            <div className='left-icon'>
                <FiChevronLeft size='45px' cursor='pointer' onClick={ goToPrevtMonth }/>
            </div>
            <div className='month'>
                <h1>{ monthsArr[useSelector(store => store.calendarContent.monthIndex)] }</h1>
                <h2>{ dateString ? dateString : year }</h2>
            </div>
            <div className='right-icon' >
                <FiChevronRight size='45px' cursor='pointer' onClick={ goToNextMonth }/>
            </div>
        </div>
    );
}
