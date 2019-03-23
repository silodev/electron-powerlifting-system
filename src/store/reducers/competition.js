
import MOCK_LIFTERS from '../../mock/Lifters';
import nextLifter, { roundHandler, isCompCompleted } from '../../helpers/competition/nextLifter'
const initialState = {
    currentLoad: {},
    currentLifter: {},
    lifters: MOCK_LIFTERS,
    round: {
        lift: 1,
        no: 1
    },
    compRules: {
        lifts: 3
    },
    activeComp: true
};
//Move to own folder
const currentLifterStateOrganizer = (currentLifter, round, props) => {
    return {
        ...currentLifter,
        lifts: {
            ...currentLifter.lifts,
            [round.lift]: {
                ...currentLifter.lifts[round.lift],
                [round.no]: {
                    ...currentLifter.lifts[round.lift][round.no],
                    ...Object.assign({}, props)
                }
            }
        }
    }
}

const competition = (state = initialState, action) => {
    const currentLifter = action.id !== undefined ? { ...state.lifters.find(l => l.id === action.id) } : state.currentLifter;
    switch (action.type) {
        case 'SET_CURRENT_LIFTER':
            return {
                ...state,
                currentLifter: {
                    ...currentLifterStateOrganizer(currentLifter, state.round)
                },
                lifters: [
                    ...state.lifters.map(el => el.id === currentLifter.id ? Object.assign({},
                        currentLifterStateOrganizer(currentLifter, state.round)) : el)
                ]
            }
        case 'JUDGE_LIFT':
            //Updating the lifters based on the last judge call
            const updatedLifters = [
                ...state.lifters.map(el => el.id === currentLifter.id ? Object.assign({},
                    currentLifterStateOrganizer(currentLifter, state.round,
                        action.props)) : el)];
            //Checks if there is more rounds of the event (if there is more ) increase the roundnumber by one
            //If the comp is over change it to non active
            const currentRound = roundHandler(updatedLifters, state.round);
            const activeComp = !isCompCompleted(state.compRules, currentRound, updatedLifters);        
            return {
                ...state,
                currentLifter: activeComp ?
                    { ...state.lifters.find(l => l.id === nextLifter(updatedLifters, currentRound).id) } :
                    { ...state.currentLifter },
                lifters: updatedLifters,
                round: currentRound,
                activeComp: activeComp
            }
        default:
            return state;
    }

}

export default competition;