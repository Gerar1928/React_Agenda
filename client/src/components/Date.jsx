import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getNextMonth, getPrevMonth } from '../redux/actions.js';

const Date = () => {

    const currentMonth = useSelector(store => store.content.monthIndex);
    const year = useSelector(store => store.content.year);
    const dateString = useSelector(store => store.content.localeDateString);
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    const dispatch = useDispatch();

    const goToNextMonth = () => {
        dispatch(getNextMonth(year, currentMonth));
    };

    const goToPrevtMonth = () => {
        dispatch(getPrevMonth(year, currentMonth));
    };

    return (
        <div className ='date'>
            <div className='left-icon'>
                <FiChevronLeft size='45px' cursor='pointer' onClick={ goToPrevtMonth }/>
            </div>
            <div className='month'>
                <h1>{ months[useSelector(store => store.content.monthIndex)] }</h1>
                <h2>{ dateString ? dateString : year }</h2>
            </div>
            <div className='right-icon' >
                <FiChevronRight size='45px' cursor='pointer' onClick={ goToNextMonth }/>
            </div>
        </div>
    );
};

export default Date; 
