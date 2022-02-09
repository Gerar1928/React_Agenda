export function dateStringReducer(state = { localeDateString: '' }, action) {
    switch(action.type) {
        case 'STORE_EVENT_ID':
            return { ...state, content: action.content };
        default: 
            return state;
    }
}