import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loading.css'


class Loading extends Component {
    render() {
        return (
            

        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        minutes: state.stopWatch.minutes,
        timePopOverOpen: state.stopWatch.timePopoverOpen

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTime: (minutes) => dispatch({ type: 'CHANGE_TIME', value: minutes }),
        toggle: () => dispatch({ type: 'TOGGLE' }),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withTimer({
    startImmediately: false,
    initialTime: 60000,
})(StopWatch));