import React from 'react';
import { connect } from 'react-redux';
import { Button, InputGroup } from 'reactstrap';

import './CallButtons.css';
import { allowCall } from '../../../helpers/competition/attemptHandler';

const CallButtons = (props) => {
  /*   console.log(props);
    const isEnabled = props.currentlifter !== undefined ? allowCall(props.currentlifter, props.round) : true */
    return (
        <InputGroup style={{ height: '100%' }}>
            <Button
                disabled={props.activeComp }
                className="GoodLiftButton"
                onClick={() => props.judgeLift({call: true})} />
            <Button
                disabled={props.activeComp}
                className="NoLiftButton"
                onClick={ () => props.judgeLift({call: false})} />
        </InputGroup>
    )
}

const mapStateToProps = state => {
    return {
        activeComp: !state.competition.activeComp,
      
    };
}; 

const mapDispatchToProps = dispatch => {
    return {
        judgeLift: (props) => dispatch({ type: 'JUDGE_LIFT', props: props })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CallButtons);