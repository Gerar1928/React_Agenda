import { createStore } from 'redux';
import { reducer } from './reducer.js';

const now = new Date();
const monthIndex = now.getMonth();
const fullYear = now.getFullYear();
// const date = now.toLocaleDateString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });

const getMonthDays = (year, month) => {
    const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
    const daysArr = [];

    for(let i = 1; i <= currentMonthLastDay; i++) {
        const isWeekend = new Date(year, month, i).getDay();
        if (isWeekend === 0 || isWeekend === 6) {
            daysArr.push({ day: i, weekend: true });
        } else {
            daysArr.push({ day: i, weekend: false });
        }
    }

    return daysArr;
};

const getPrevMonthDays = (year, month) => {
    const currentMonthFirstDay = new Date(year, month, 1).getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];

    for(let i = currentMonthFirstDay; i > 0; i--){
        const prevDay = (prevMonthLastDay - i) + 1;
        const isWeekend = new Date(year, month - 1, prevDay).getDay();
        if (isWeekend === 0 || isWeekend === 6) {
            prevMonthDays.push({ day: prevDay, weekend: true, });
        } else {
            prevMonthDays.push({ day: prevDay, weekend: false }); 
        }
    }

    return prevMonthDays;
};

const getNextMonthDays = (year, month) => {
    const currentMonthLastDay = new Date(year, month + 1, 0).getDay();
    const nextMonthDays = [];

    for(let i = 1; i <= (6 - currentMonthLastDay); i++) {
        const isWeekend = new Date(year, month + 1, i).getDay();
        if (isWeekend === 0 || isWeekend === 6) {
            nextMonthDays.push({ day: i, weekend: true });
        } else {
            nextMonthDays.push({ day: i, weekend: false });
        }
    }

    return nextMonthDays;
};

const initialState = {
    content: {
        monthIndex, 
        fullYear, 
        days: {
            prevMonthDays: getPrevMonthDays(fullYear, monthIndex),
            currentMonthDays: getMonthDays(fullYear, monthIndex),
            nextMotnhDays: getNextMonthDays(fullYear, monthIndex)
        },
        localeDateString: ''
    }
};

const store = createStore(reducer, initialState);

export { store, getMonthDays, getPrevMonthDays, getNextMonthDays }; 