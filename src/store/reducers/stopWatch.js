const initialState = {
    minutes: 60000,
    timePopoverOpen: false
};

const stopWatch = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TIME':
            console.log(action.value)
            return {
                ...state,
                minutes: action.value > 1 ? action.value * 60000 : 60000
            }
        case 'TOGGLE':
            console.log(state.timePopoverOpen)
            return {
                ...state,
                timePopoverOpen: !state.timePopoverOpen
            }
        default:
            return state;
    }
}

export default stopWatch;