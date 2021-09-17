import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer.js';

const now = new Date();
const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getCurrentMonthDays = (year, month) => {
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
}

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
}

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
}

// Fetches to get current month events. 
const fecthCurrentMonthEvents = async (month) => {
    try {
        const init = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query {
                    event(month: "${month}") {
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
    
        return data.data.event;
    } catch (err) {
        console.log(err);
    }
}

const initialState = {
    content: {
        monthIndex: now.getMonth(),
        year: now.getFullYear(),
        month: monthsArr[now.getMonth()],
        daySelected: 0,
        days: {
            prevMonthDays: getPrevMonthDays(now.getFullYear(), now.getMonth()),
            currentMonthDays: getCurrentMonthDays(now.getFullYear(), now.getMonth()),
            nextMonthDays: getNextMonthDays(now.getFullYear(), now.getMonth())
        },
        localeDateString: '',
        events: (async () => await fecthCurrentMonthEvents(monthsArr[now.getMonth()]))()
    }
}

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export { store, getCurrentMonthDays, getPrevMonthDays, getNextMonthDays, fecthCurrentMonthEvents }; 