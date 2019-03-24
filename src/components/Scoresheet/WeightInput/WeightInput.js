import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Button, Popover, InputGroup } from 'reactstrap';

import './WeightInput.css';
import { getLastAttempCall } from '../../../helpers/competition/attemptHandler';

class WeightInput extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.increaseWeight = this.increaseWeight.bind(this);
        this.decreaseWeight = this.decreaseWeight.bind(this);
        this.changeIncrementSteps = this.changeIncrementSteps.bind(this);
        this.setWeight = this.setWeight.bind(this);
        this.state = {
            popoverOpen: false,
            placeholderWeight: 0,
            lastWeight: this.props.lastWeight,
            incrementSteps: 0.5,
            increment: 2.5
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    setWeight() {
        if (this.state.placeholderWeight > 0) {
            this.props.changeWeight({
                id: this.props.id,
                round: {
                    lift: this.props.index.lift,
                    no: this.props.index.no
                },
                weight: this.state.placeholderWeight === this.props.lastWeight &&
                    getLastAttempCall(this.props.lifters, { round: this.props.round, id: this.props.id }) ? this.state.placeholderWeight + 2.5 : this.state.placeholderWeight

            });
            this.setState({ popoverOpen: !this.state.popoverOpen })
        }

    }
    changeIncrementSteps(increment) {
        this.setState({ increment });
    }
    increaseWeight() {
        this.setState({
            placeholderWeight:
                this.state.placeholderWeight === 0 ?
                    this.props.lastWeight + parseFloat(this.state.increment) :
                    this.state.placeholderWeight + parseFloat(this.state.increment)
        })
    }
    decreaseWeight() {
        this.setState({
            placeholderWeight: this.state.placeholderWeight !== 0 && this.props.lastWeight < this.state.placeholderWeight ?
                this.state.placeholderWeight - parseFloat(this.state.increment) :
                this.props.lastWeight
        })
    }
    render() {
        const { lift, changeWeight, id, index } = this.props;
        const elId = `input-${id}-${index.lift}-${index.no}`;
        console.log(this.props.lastWeight)
        return (
            <React.Fragment>
                <Input
                    className={lift.call != null && lift.call
                        ? 'GoodLift'
                        : lift.call != null && !lift.call
                            ? 'NoLift'
                            : null}
                    onChange={(e) => changeWeight({
                        round: {
                            lift: index.lift,
                            no: index.round
                        },
                        id: id,
                        weight: e.currentTarget.value
                    })}
                    id={elId}
                    type="number"
                    placeholder={lift.weight !== 0 ? lift.weight : this.state.placeholderWeight}
                    readOnly={!lift.active}
                />
                <Popover
                    className="ChangeWeightPopover"
                    placement="top"
                    isOpen={this.state.popoverOpen}
                    target={elId}
                    toggle={lift.active ? this.toggle : null}>
                    <InputGroup>
                        <Button className="IncrementButton Plus" onClick={this.increaseWeight} > + </Button>
                        <Button className="IncrementButton Minus" onClick={this.decreaseWeight} > - </Button>
                        <Button className="IncrementButton" onClick={this.setWeight} disabled={this.state.placeholderWeight === 0}>Set</Button>
                        <Input className="IncrementSteps"
                            value={this.state.increment}
                            step={0.5}
                            onChange={(e) => this.changeIncrementSteps(e.currentTarget.value)}
                            type="number" />
                    </InputGroup>
                </Popover>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        lifters: state.competition.lifters,
        round: state.competition.round
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeWeight: (props) => dispatch({ type: 'CHANGE_WEIGHT', props: props })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightInput);