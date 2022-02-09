/* eslint-disable no-array-constructor */
const initialState = {
    eventSelectedId: '',
    events: new Array()
}

export function eventsArrReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_EVENT':
            return { ...state, content: action.content };
        case 'REMOVE_EVENT':
            return { ...state, content: action.content };
        case 'STORE_EVENT_ID':
            return { ...state, content: action.content };
        default:
            return state
    }
}