import { monthsArr } from '../../common/months.js';
import { getCurrentMonthDays, getNextMonthDays, getPrevMonthDays } from '../../common/Calendar.js';

const initialState = {
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear(),
    month: monthsArr[new Date().getMonth()],
    daySelected: 0,
    days: {
        prevMonthDays: getPrevMonthDays(new Date().getFullYear(), new Date().getMonth()),
        currentMonthDays: getCurrentMonthDays(new Date().getFullYear(), new Date().getMonth()),
        nextMonthDays: getNextMonthDays(new Date().getFullYear(), new Date().getMonth())
    }
}

export function monthReducer (state = initialState, action) {
    switch (action.type) {
        case 'NEXT_MONTH':
            return { ...state, content: action.content };
        case 'PREVIOUS_MONTH':
            return { ...state, content: action.content };
        default:
            return state;
    }
}