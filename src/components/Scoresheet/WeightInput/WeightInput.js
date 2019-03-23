import React from 'react';

import { Input } from 'reactstrap';

import './WeightInput.css';

const WeightInput = (props) => {
    const { lift } = props;
    return (
        <Input
            className={
                    lift.call != null &&
                    lift.call
                    ? 'GoodLift'
                    : lift.call != null && !lift.call
                        ? 'NoLift'
                        : null
            }/* 
            value={lift.weight} */
            type="number"
            placeholder={lift.weight}
            readOnly={!lift.active}
            min={lift.weight} />
    )
}

export default WeightInput;