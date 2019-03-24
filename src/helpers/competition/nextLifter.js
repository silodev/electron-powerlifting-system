const assertTurnByLotNo = (lifters, round) => {
    return lifters.find(l => l.lotNo === Math.min.apply(Math, lifters.map(l => {
        return l.lotNo;
    })));
}

const multipleLifterWithSameSelectedLoad = (lifters, currentLifter, round) => {
    console.log(currentLifter, round, lifters);
    return lifters.filter(x => x.lifts[round.lift][round.no].weight === currentLifter.lifts[round.lift][round.no].weight && x.lifts[round.lift][round.no].call === null);
}

const getLifterWithLowestSelectedLoad = (lifters, round) => {
    lifters = lifters.filter(l => l.lifts[round.lift][round.no].call === null);
    return lifters.filter(l => l.lifts[round.lift][round.no].call === null)
        .find(l =>
            l.lifts[round.lift][round.no].weight === Math
                .min
                .apply(Math, lifters.map(l => {
                    return l.lifts[round.lift][round.no].weight;

                }))
        )

}

export const roundHandler = (lifters, round) => {
    if (lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0 && round.no === 3 && round.lift < 3) {
        round = {
            lift: round.lift + 1,
            no: 1
        }
    }
    if (lifters.filter(x => x.lifts[round.lift][round.no].call === null).length === 0 && round.no < 3) {
        round = {
            lift: round.lift,
            no: round.no + 1
        }
    }
    return round;
}

export const isCompCompleted = (compRules, round, lifters) => {
    return lifters
        .filter(x => x.lifts[round.lift][round.no].call === null)
        .length === 0 && compRules.lifts === 3 && round.no === 3;
}

// Activates the next weight input and inactivates the current attempt (implement
// timer of some sort)
export const activateNextAttempt = (currentLifter, lifters, round, compRules) => {
    if (round.no === 3 && round.lift < 3) {
        currentLifter.lifts[round.lift + 1][1].active = true;
    }
    if (round.no < 3) {
        currentLifter.lifts[round.lift][round.no + 1].active = true;
    }
    return currentLifter;
}

// Checks for the next lifter in the current event -> current round based on the
// lowest weight that has not been called. Checks for lifters with same
// selected weight (if more than one) -> returns the lifter with the lowest
// lotnumber. Returns the current lifter and activates the next weightinput
const nextLifter = (lifters, round, compRules) => {
    /* if (lastLifterOfTheRound(round, lifters)) {
 
    } */

    console.log("NUUUUU", lifters);
    let currentLifter = getLifterWithLowestSelectedLoad(lifters, round);
    console.log(currentLifter);
    const liftersWithSameWeight = multipleLifterWithSameSelectedLoad(lifters, currentLifter, round);
    if (liftersWithSameWeight.length > 1) {
        currentLifter = assertTurnByLotNo(liftersWithSameWeight, round);
    }
    return activateNextAttempt(currentLifter, lifters, round, compRules);
}

export default nextLifter;