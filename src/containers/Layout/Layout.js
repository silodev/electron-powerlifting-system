import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';
import Competition from '../Competition/Competition'

import { Container, Row, Col } from 'reactstrap';

import './Layout.css';


class Layout extends Component {
    render() {
        return (
            <React.Fragment>

                <Container fluid className="Container">
                    <Row className="Header" >
                        <Header />
                    </Row>
                    <Row className="Wrapper">
                        <Col className="Navigation">
                            <Navigation />
                        </Col>
                        <Col>
                            <Competition />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>

        )
    }

}
export default Layout;