import React from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';

import TableHeader from './TableHeader/TableHeader';
import WeightInput from './WeightInput/WeightInput';

import nextLifter from '../../helpers/competition/nextLifter';

import './Scoresheet.css';
import { getLastAttemptedWeight } from '../../helpers/competition/attemptHandler';

class Scoresheet extends React.Component {
    componentDidMount() {
        const { round, lifters, setCurrentLifter } = this.props;
        setCurrentLifter(nextLifter(lifters, round).id);
    }
    render() {
        console.log(this.props);
        return (
            <Table hover>
                <TableHeader />
                <tbody>
                    {this
                        .props
                        .lifters
                        .map(p => {
                            return (
                                <tr
                                    key={p.id}
                                    className={p.id === this.props.currentLifter.id
                                        ? 'ActiveRow'
                                        : null}>
                                    <td>{p.name}</td>
                                    <td>{p.lotNo}</td>
                                    <td>{p.weight}</td>
                                    <td>{p.class}</td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[1][1]}
                                            lastWeight={p.lifts[1][1].weight}
                                            id={p.id}
                                            index={{ lift: 1, no: 1 }} 
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[1][2]}
                                            lastWeight={p.lifts[1][1].weight}
                                            id={p.id}
                                            index={{ lift: 1, no: 2 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[1][3]}
                                            lastWeight={getLastAttemptedWeight(this.props.lifters, {lift: 1, no: 2}, p.id )/*  p.lifts[1][2].weight */}
                                            id={p.id}
                                            index={{ lift: 1, no: 3 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[2][1]}
                                            lastWeight={p.lifts[2][1].weight}
                                            id={p.id}
                                            index={{ lift: 2, no: 1 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[2][2]}
                                            lastWeight={p.lifts[2][1].weight}
                                            id={p.id}
                                            index={{ lift: 2, no: 2 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[2][3]}
                                            lastWeight={p.lifts[2][2].weight}
                                            id={p.id}
                                            index={{ lift: 2, no: 3}}
                                            />
                                    </td>
                                    <td>{p.subtotal}</td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[3][1]}
                                            lastWeight={p.lifts[3][1].weight}
                                            id={p.id}
                                            index={{ lift: 3, no: 1 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[3][2]}
                                            lastWeight={p.lifts[3][1].weight}
                                            id={p.id}
                                            index={{ lift: 3, no: 2 }}
                                            />
                                    </td>
                                    <td>
                                        <WeightInput
                                            lift={p.lifts[3][3]}
                                            lastWeight={p.lifts[3][2].weight}
                                            id={p.id}
                                            index={{ lift: 3, no: 3 }}
                                            />
                                    </td>
                                    <td>{p.total}</td>
                                    <td>{p.formula.wilks}</td>
                                </tr>
                            )
                        })}

                </tbody>
            </Table>
        );
    }
}
const mapStateToProps = state => {
    return {
        lifters: state.competition.lifters,
        currentLifter: state.competition.currentLifter,
        round: state.competition.round
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentLifter: (id) => dispatch({ type: 'SET_CURRENT_LIFTER', id: id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheet);