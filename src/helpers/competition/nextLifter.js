const assertTurnByLotNo = (lifters, round) => {
    return lifters.find(l => l.lotNo === Math.min.apply(Math, lifters.map(l => {
        return l.lotNo;
    })));
}

const multipleLifterWithSameSelectedLoad = (lifters, currentLifter, round) => {
    return lifters.filter(x => x.lifts[round.lift][round.no].weight === currentLifter.lifts[round.lift][round.no].weight && x.lifts[round.lift][round.no].call === null);
}

const getLifterWithLowestSelectedLoad = (lifters, round) => {
    return lifters.find(l => {
        return l.lifts[round.lift][round.no].weight === Math
            .min
            .apply(Math, lifters.map(l => {
                return l.lifts[round.lift][round.no].weight;

            })) && l.lifts[round.lift][round.no].call === null
    });
}

export const roundHandler = (lifters, round) => {
    if (lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0 && round.no === 3 && round.lift < 3) {
        return { lift: round.lift + 1, no: 1 }
    }
    if (lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0 && round.no < 3) {
        return { lift: round.lift, no: round.no + 1 }
    }
    return round;
}

export const isCompCompleted = (compRules, round, lifters) => {
    console.log(round, compRules, lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0);
    console.log(round.lift === 3);
    console.log(round.no === 3)
    const isOver = lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0 && compRules.lifts === 3 && round.no === 3;
    console.log(isOver)
    return isOver;
}
// Checks for the next lifter in the current event -> current round based on the
// lowest weight that has not been called. Checks for lifters with same selected
// weight (if more than one) -> returns the lifter with the lowest lotnumber.
// Returns the current lifter and activates the current lift
const nextLifter = (lifters, round) => {
    if(round.lift === 3 && round.no === 3){
        console.log("dawfaw")
    }
    let currentLifter = getLifterWithLowestSelectedLoad(lifters, round);
    const liftersWithSameWeight = multipleLifterWithSameSelectedLoad(lifters, currentLifter, round);
    if (liftersWithSameWeight.length > 1) {
        currentLifter = assertTurnByLotNo(liftersWithSameWeight, round);
    }
    currentLifter.lifts[round.lift][round.no].active = true;
    return currentLifter;
}

export default nextLifter;