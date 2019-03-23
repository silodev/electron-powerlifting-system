import React from 'react';
import { connect } from 'react-redux';
import { Button, InputGroup } from 'reactstrap';

import './CallButtons.css';

const CallButtons = (props) => {
    return (
        <InputGroup style={{ height: '100%' }}>
            <Button
                disabled={props.activeComp}
                className="GoodLiftButton"
                onClick={() => props.judgeLift({call: true, active: false})} />
            <Button
                disabled={props.activeComp}
                className="NoLiftButton"
                onClick={() => props.judgeLift({call: false, active: false})} />
        </InputGroup>
    )
}

const mapStateToProps = state => {
    return {
        activeComp: !state.competition.activeComp
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        judgeLift: (props) => dispatch({ type: 'JUDGE_LIFT', props: props })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallButtons);