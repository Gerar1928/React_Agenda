import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { initialState, now, monthsArr } from './redux/initial_state.js';
import { reducer } from './redux/reducer.js';
import App from './App';

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
                    event(month: "${monthsArr[now.getMonth()]}") {
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
        });
        const data = await res.json();
    
        initialState.content.events = data.data.event;

        const store = createStore(reducer, initialState, applyMiddleware(thunk));

        ReactDOM.render(
            <Provider store={ store } >
                <App />
            </Provider>, 
            container
        );

    } catch (err) {
        ReactDOM.render(<h1>An error has occurred while loading the page.</h1>, container);
    }
})();

