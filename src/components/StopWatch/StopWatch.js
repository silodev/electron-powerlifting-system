import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Timer from 'react-compound-timer';
import { Input, Popover, PopoverHeader, InputGroup, Badge, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faHistory, faStopwatch } from '@fortawesome/free-solid-svg-icons'

import './StopWatch.css'

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps} startImmediately={false}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class StopWatch extends PureComponent {
    componentDidMount() {
        const { setDirection, setTime } = this.props.timer;
        setTimeout(() => {
            setDirection("backward");
            setTime(this.props.minutes);
        }, 3000);
    }
    setTime(minutes) {
        this.props.changeTime(minutes);
        this.props.timer.setTime(
            minutes > 0 ?
            minutes * 60000 :
            60000
        );
    }
    render() {
        return (
            <div>
                <div className={`Digits ${this.props.timer.timerState}`}>
                    <Timer.Minutes formatValue={(value) => `${(value >= 10 ? `${value}` : `0${value}`)}`} />
                    <Timer.Seconds formatValue={(value) => `${(value < 10 ? `:0${value}` : `:${value}`)} `} />
                </div>
                <div className="TimerButtonToolbar">
                    <FontAwesomeIcon className="TimerButton" icon={faPlay} onClick={this.props.timer.start} />
                    <FontAwesomeIcon className="TimerButton" icon={faPause} onClick={this.props.timer.pause} />
                    <FontAwesomeIcon className="TimerButton" icon={faHistory} onClick={this.props.timer.reset} />
                    <FontAwesomeIcon className="TimerButton" id="ChangeTime" icon={faStopwatch} />

                    <Popover isOpen={this.props.timePopOverOpen} target="ChangeTime" className="ChangeTimePopOver" toggle={this.props.toggle}>
                        <PopoverHeader>Change Time</PopoverHeader>
                        <InputGroup size="sm" style={{ padding: 5 }}>
                            <Input
                                onChange={(e) => this.setTime(e.currentTarget.value)}
                                placeholder={this.props.minutes / 1000 / 60}
                                type="number"
                                min={1}
                            />
                        </InputGroup>
                    </Popover>

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
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

