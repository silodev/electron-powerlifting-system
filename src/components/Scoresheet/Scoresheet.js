import React from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';

import TableHeader from './TableHeader/TableHeader';
import WeightInput from './WeightInput/WeightInput';


import nextLifter from '../../helpers/competition/nextLifter';

import './Scoresheet.css';

class Scoresheet extends React.Component {
    componentDidMount() {
        const { round, lifters, setCurrentLifter, } = this.props;
        setCurrentLifter(nextLifter(lifters, round).id);
      
    }
    
    render() {
        console.log(this.props)
        /* if(Object.entries(this.props.currentLifter).length === 0 && this.props.currentLifter.constructor === Object){
            this.props.setCurrentLifter(nextLifter(this.props.lifters, this.props.round));
        } */
        console.log(this.props.currentLifter)
        return (
            <Table hover>
                <TableHeader />
                <tbody>
                    {this
                        .props
                        .lifters
                        .map(p => {
                            return (
                                <tr key={p.id} className={p.id === this.props.currentLifter.id ? 'ActiveRow' : null}>
                                    <td>{p.name}</td>
                                    <td>{p.lotNo}</td>
                                    <td>{p.weight}</td>
                                    <td>{p.class}</td>
                                    <td>
                                        <WeightInput lift={p.lifts[1][1]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[1][2]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[1][3]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[2][1]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[2][2]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[2][3]} />
                                    </td>
                                    <td>{p.subtotal}</td>
                                    <td>
                                        <WeightInput lift={p.lifts[3][1]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[3][2]} />
                                    </td>
                                    <td>
                                        <WeightInput lift={p.lifts[3][3]} />
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