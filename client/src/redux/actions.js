import { now, getCurrentMonthDays, getPrevMonthDays, getNextMonthDays, fecthCurrentMonthEvents } from './initial_state.js';

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const moveBetweenMonths = (TYPE, year, monthIndex, events) => {
    return {
        type: TYPE,
        content: {
            monthIndex: monthIndex,
            year: year,
            month: monthsArr[monthIndex],
            daySelected: 0,
            days: {
                prevMonthDays: getPrevMonthDays(year, monthIndex),
                currentMonthDays: getCurrentMonthDays(year, monthIndex),
                nextMonthDays: getNextMonthDays(year, monthIndex)
            },
            localeDateString: '',
            events: events
        }
    }
}

const updateDateString = (stateContent, daySelected, localDateString) => {
    return {
        type: 'UPDATE_DATE_STRING',
        content: {
            ...stateContent, 
            daySelected: daySelected,
            localeDateString: localDateString
        }
    }
}

const updateEvents = (TYPE, state, eventsUpdated) => {
    return {
        type: TYPE,
        content: {
            ...state,
            events: eventsUpdated
        }
    }
}

const dispatchCurrentMonthEvents = (TYPE, year = now.getFullYear(), monthIndex = now.getMonth(), actionFunc) => {
    return async dispatch => {
        const data = await fecthCurrentMonthEvents(monthsArr[monthIndex]);
        return dispatch(actionFunc(TYPE, year, monthIndex, data));
    }
}

export { moveBetweenMonths, updateDateString, updateEvents, dispatchCurrentMonthEvents };