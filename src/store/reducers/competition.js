
import MOCK_LIFTERS from '../../mock/Lifters';

import nextLifter, { roundHandler, isCompCompleted } from '../../helpers/competition/nextLifter';
import { bestLiftCalculator, subtotalCalculator, totalCalculator } from '../../helpers/competition/totalCalculator';
import { changeWeight, allowCall } from '../../helpers/competition/attemptHandler';

const initialState = {
    currentLoad: {},
    currentLifter: {},
    lastLifter: {},
    nextLifter: {},
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
                },
                bestLift: bestLiftCalculator(currentLifter, round, props)
            }
        },
        subtotal: subtotalCalculator(round, currentLifter, props),
        total: totalCalculator(round, currentLifter, props)
    }
}

const competition = (state = initialState, action) => {
    const currentLifter = action.id !== undefined ? { ...state.lifters.find(l => l.id === action.id) } : state.currentLifter;
    switch (action.type) {
        //CHANGE NAME TO INITIALIZE_COMPETITION
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
            //If the next weight has not been updated you cant do a judgecall
            if (!allowCall(state.currentLifter, state.round)) {
                return state;
            }
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
                lastLifter: { ...state.currentLifter },
                currentLifter: activeComp ?
                    { ...state.lifters.find(l => l.id === nextLifter(updatedLifters, currentRound, currentLifter, state.compRules).id) } :
                    { ...state.currentLifter },
                lifters: updatedLifters,
                round: currentRound,
                activeComp: activeComp
            }
        case 'CHANGE_WEIGHT':
            console.log(action.props)
            console.log("ÄNDRAD")
            return {
                ...state,
                lifters: changeWeight(state.lifters, action.props),
                currentLifter: { ...state.lifters.find(l => l.id === nextLifter(changeWeight(state.lifters, action.props), state.round, state.compRules).id) },
            }

        /*  case 'GET_LASTATTEMPT_CALL':
             return {
                 ...state,
                 lifters: [
                     changeWeight(state.lifters, action.props)
                 ]
             } */
        default:
            return state;
    }

}

export default competition;