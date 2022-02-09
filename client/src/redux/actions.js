import { fecthCurrentMonthEvents } from './initial_state.js';
import { getCurrentMonthDays, getPrevMonthDays, getNextMonthDays } from '../common/Calendar.js';
import { monthsArr } from '../common/months.js';

const { getFullYear, getMonth } = new Date();

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
            eventSelectedId: '',
            events: events
        }
    }
}

// Adds local date to the store.
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

// Adds event id to the store.
const storeEventId = (stateContent, eventId) => {
    return {
        type: 'STORE_EVENT_ID',
        content: {
            ...stateContent,
            eventSelectedId: eventId
        }
    }
}

// Updates events array on the store.
const updateEvents = (TYPE, stateContent, eventsUpdated) => {
    return {
        type: TYPE,
        content: {
            ...stateContent,
            events: eventsUpdated
        }
    }
}

const dispatchCurrentMonthEvents = (TYPE, year = getFullYear(), monthIndex = getMonth(), actionFunc) => {
    return async dispatch => {
        const data = await fecthCurrentMonthEvents(monthsArr[monthIndex]);
        return dispatch(actionFunc(TYPE, year, monthIndex, data));
    }
}

export { moveBetweenMonths, updateDateString, storeEventId, updateEvents, dispatchCurrentMonthEvents };