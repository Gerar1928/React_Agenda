import { getCurrentMonthDays, getPrevMonthDays, getNextMonthDays } from './store.js';

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getNextMonth = (year, monthIndex) => {
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
                localeDateString: ''
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
                localeDateString: ''
            }
        };
    }
};

const getPrevMonth = (year, monthIndex) => {
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
                localeDateString: ''
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