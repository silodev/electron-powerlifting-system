export const subtotalCalculator = (round, currentLifter, props) => {
    if (round.lift === 2) {
        if (currentLifter.lifts[1].bestLift !== 0 && currentLifter.lifts[2].bestLift !== 0) {
            currentLifter.subtotal =
                currentLifter.lifts[1].bestLift +
                currentLifter.lifts[2].bestLift;
        }
        if (currentLifter.lifts[1].bestLift !== 0 &&
            props.call === true &&
            round.no === 1) {
            currentLifter.subtotal =
                currentLifter.lifts[1].bestLift +
                currentLifter.lifts[2][round.no].weight
        }
    }
    return currentLifter.subtotal;
}

export const totalCalculator = (round, currentLifter, props) => {
    if (round.lift === 3) {
        if (currentLifter.subtotal !== 0) {
            currentLifter.total =
                currentLifter.subtotal +
                currentLifter.lifts[3].bestLift;
        }
        if (currentLifter.subtotal !== 0 &&
            props.call === true && round.no === 1) {
            currentLifter.total =
                currentLifter.subtotal +
                currentLifter.lifts[3][round.no].weight;
        }
    }
    return currentLifter.total;
}

export const bestLiftCalculator = (currentLifter, round, props) => {
    return props !== undefined &&
        props.call !== undefined &&
        props.call === true &&
        currentLifter.lifts[round.lift][round.no].weight > currentLifter.lifts[round.lift].bestLift
        ? currentLifter.lifts[round.lift][round.no].weight
        : currentLifter.lifts[round.lift].bestLift
}