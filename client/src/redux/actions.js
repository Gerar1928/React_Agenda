import { getCurrentMonthDays, getPrevMonthDays, getNextMonthDays } from './store.js';

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getNextMonth = (year, monthIndex, events) => {
    if (monthIndex === 11) {
        const nextYear = (year + 1);
        return {
            type: 'NEXT_MONTH',
            content: {
                monthIndex: 0,
                year: nextYear,
                month: monthsArr[0],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(nextYear, 0),
                    currentMonthDays: getCurrentMonthDays(nextYear, 0),
                    nextMonthDays: getNextMonthDays(nextYear, 0)
                }, 
                localeDateString: '',
                events: events.data.event
            }
        };
    } else {
        const nextMonthIndex = (monthIndex + 1); 
        return {
            type: 'NEXT_MONTH',
            content: {
                monthIndex: nextMonthIndex,
                year: year,
                month: monthsArr[nextMonthIndex],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(year, nextMonthIndex),
                    currentMonthDays: getCurrentMonthDays(year, nextMonthIndex),
                    nextMonthDays: getNextMonthDays(year, nextMonthIndex)
                },
                localeDateString: '',
                events: events.data.event
            }
        };
    }
};

const getPrevMonth = (year, monthIndex, events) => {
       if (monthIndex === 0) {
        const prevYear = (year - 1);
        return {
            type: 'PREVIOUS_MONTH',
            content: {
                monthIndex: 11,
                year: prevYear,
                month: monthsArr[11],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(prevYear, 11),
                    currentMonthDays: getCurrentMonthDays(prevYear, 11),
                    nextMonthDays: getNextMonthDays(prevYear, 11)
                },
                localeDateString: '',
                events: events.data.event
            }
        };
    } else {
        const prevMonthIndex = (monthIndex - 1); 
        return {
            type: 'PREVIOUS_MONTH',
            content: {
                monthIndex: (monthIndex - 1),
                year: year,
                month: monthsArr[prevMonthIndex],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(year, prevMonthIndex),
                    currentMonthDays: getCurrentMonthDays(year, prevMonthIndex),
                    nextMonthDays: getNextMonthDays(year, prevMonthIndex)
                },
                localeDateString: '',
                events: events.data.event
            }
        };
    }
}; 

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

const getMonthEvents = (year, monthIndex, actionFunc) => {
    return async dispatch => {
        const init = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query {
                    event {
                      id
                      name
                      description
                      timestamp {
                        date
                        day
                        month
                        year
                      }
                    }
                  }`
            })
        }

        const res = await fetch('http://localhost:9000/graphql', init);
        const data = await res.json();

        return dispatch(actionFunc(year, monthIndex, data));
    }
}

export { getNextMonth, getPrevMonth, updateDateString, getMonthEvents };