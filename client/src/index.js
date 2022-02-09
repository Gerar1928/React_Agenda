import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { monthsArr } from './common/months.js';
import { store } from './redux/store.js';

const container = document.getElementById('root');

// Makes sure that events are stored on the store prior rendering.
(async () => {
    try {
        const res = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query {
                    event(month: "${ monthsArr[new Date().getMonth()] }") {
                      id
                      name
                      description
                      timestamp {
                        day
                        month
                        year
                      }
                    }
                  }`
            })
        });
        
        const data = await res.json();
    
        // initialState.content.events = data.data.event;

        ReactDOM.render(
            <Provider store={ store } >
                <App />
            </Provider>, 
            container
        );

    } catch (err) {
        ReactDOM.render(<h1>An error has occurred while loading the page.</h1>, container);
        console.log(err);
    }
})();

