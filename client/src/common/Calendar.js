/* eslint-disable no-array-constructor */
class Calendar {
    getCurrentMonthDays(year, month) {
        const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
        const currentMonthDaysArr = new Array();
    
        for(let i = 1; i <= currentMonthLastDay; i++) {
            const dayOfTheWeek = new Date(year, month, i).getDay();
            if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
                currentMonthDaysArr.push({ day: i, isWeekend: true });
            } else {
                currentMonthDaysArr.push({ day: i, isWeekend: false });
            }
        }
    
        return currentMonthDaysArr;
    }

    getPrevMonthDays(year, month) {
        const currentMonthFirstDay = new Date(year, month, 1).getDay();
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const prevMonthDaysArr = new Array();
    
        for(let i = currentMonthFirstDay; i > 0; i--) {
            const prevMonthDay = (prevMonthLastDay - i) + 1;
            const dayOfTheWeek = new Date(year, month - 1, prevMonthDay).getDay();

            if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
                prevMonthDaysArr.push({ day: prevMonthDay, isWeekend: true });
            } else {
                prevMonthDaysArr.push({ day: prevMonthDay, isWeekend: false }); 
            }
        }
    
        return prevMonthDaysArr;
    }
    
    getNextMonthDays(year, month) {
        const currentMonthLastDay = new Date(year, month + 1, 0).getDay();
        const nextMonthDaysArr = new Array();
    
        for(let i = 1; i <= (6 - currentMonthLastDay); i++) {
            const dayOfTheWeek = new Date(year, month + 1, i).getDay();

            if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
                nextMonthDaysArr.push({ day: i, isWeekend: true });
            } else {
                nextMonthDaysArr.push({ day: i, isWeekend: false });
            }
        }
    
        return nextMonthDaysArr;
    }
}

export const { getCurrentMonthDays, getNextMonthDays, getPrevMonthDays } = new Calendar();