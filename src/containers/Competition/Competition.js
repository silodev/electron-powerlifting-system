import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';


import { Container, Row, Col } from 'reactstrap';

import './Competition.css';

import Scoresheet from '../../components/Scoresheet/Scoresheet';
import StopWatch from '../../components/StopWatch/StopWatch';
import Toolbar from '../../components/Toolbar/Toolbar';

class Competiton extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Container fluid className="Container Competition" >
                    <Row className="LifterDetails">
                        <Col className="StopWatch">
                            <StopWatch />
                        </Col>
                        <Col className="Loading">
                            <div></div>
                        </Col>
                        <Col className="CurrentLifter">
                            <div></div>
                        </Col>
                    </Row>
                    <Row className="Scoresheet">
                        <Scoresheet />
                    </Row>
                    <Row className="Toolbar">
                        <Toolbar />
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
export default Competiton;

