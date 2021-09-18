const reducer = (state, action) => {
    if (action.type === 'NEXT_MONTH') {
        return { ...state, content: action.content }
    } else if (action.type === 'PREVIOUS_MONTH') {
        return { ...state, content: action.content };
    } else if (action.type === 'UPDATE_DATE_STRING') {
        return { ...state, content: action.content }
    } else {
        return state;
    }
}

export { reducer };