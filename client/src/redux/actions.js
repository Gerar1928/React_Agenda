import { getMonthDays, getPrevMonthDays, getNextMonthDays } from './store.js';

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getNextMonth = (fullYear, monthIndex) => {
    if (monthIndex === 11) {
        const nextYear = (fullYear + 1);
        return {
            type: 'NEXT_MONTH',
            content: {
                monthIndex: 0,
                fullYear: nextYear,
                month: monthsArr[0],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(nextYear, 0),
                    currentMonthDays: getMonthDays(nextYear, 0),
                    nextMotnhDays: getNextMonthDays(nextYear, 0)
                }, 
                localeDateString: ''
            }
        };
    } else {
        const nextMonthIndex = (monthIndex + 1); 
        return {
            type: 'NEXT_MONTH',
            content: {
                monthIndex: nextMonthIndex,
                fullYear: fullYear,
                month: monthsArr[nextMonthIndex],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(fullYear, nextMonthIndex),
                    currentMonthDays: getMonthDays(fullYear, nextMonthIndex),
                    nextMotnhDays: getNextMonthDays(fullYear, nextMonthIndex)
                },
                localeDateString: ''
            }
        };
    }
};

const getPrevMonth = (fullYear, monthIndex) => {
       if (monthIndex === 0) {
        const prevYear = (fullYear - 1);
        return {
            type: 'PREVIOUS_MONTH',
            content: {
                monthIndex: 11,
                fullYear: prevYear,
                month: monthsArr[11],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(prevYear, 11),
                    currentMonthDays: getMonthDays(prevYear, 11),
                    nextMotnhDays: getNextMonthDays(prevYear, 11)
                },
                localeDateString: ''
            }
        };
    } else {
        const prevMonthIndex = (monthIndex - 1); 
        return {
            type: 'PREVIOUS_MONTH',
            content: {
                monthIndex: (monthIndex - 1),
                fullYear: fullYear,
                month: monthsArr[prevMonthIndex],
                daySelected: 0,
                days: {
                    prevMonthDays: getPrevMonthDays(fullYear, prevMonthIndex),
                    currentMonthDays: getMonthDays(fullYear, prevMonthIndex),
                    nextMotnhDays: getNextMonthDays(fullYear, prevMonthIndex)
                },
                localeDateString: ''
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

export { getNextMonth, getPrevMonth, updateDateString };