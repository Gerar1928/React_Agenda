import Weekday from './Weekday';

const WeekdaysContainer = () => {

    const weekdaysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className='weekdaysContainer'>
            { weekdaysArr.map((day, index) => <Weekday key={index} day={ day }/>) }
        </div>
    );
};

export default WeekdaysContainer;