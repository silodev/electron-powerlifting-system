export const changeWeight = (lifters, props) => {
    console.log(lifters, props)
    lifters.map(l => {
        if (l.id === props.id) {
            l.lifts[props.round.lift][props.round.no].weight = props.weight;
            l.lifts[props.round.lift][props.round.no].active = false;
        }
    });
    console.log(lifters);
    return lifters;
}

export const getLastAttempCall = (lifters, props) => {
    let lastAttemptCall = false;
    lifters.map(l => {
        if (l.id === props.id) {
            lastAttemptCall = l.lifts[props.round.lift][props.round.no === 1 ? 1 : props.round.no - 1].call;
        }
    });
    return lastAttemptCall;
}

export const getLastAttemptedWeight = (lifters, round, id) => {
    let lastAttemptedWeight = 0;
    lifters.find(l => {
        if (l.id === id) {
            lastAttemptedWeight = l.lifts[round.lift][round.no].weight;
        }
    })
    return lastAttemptedWeight;
}

export const allowCall = (currentLifter, round) => {
    console.log("ALLOWCALL", currentLifter.lifts[round.lift][round.no].weight)
    return currentLifter.lifts[round.lift][round.no].weight > 0;
}