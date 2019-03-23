import React from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap'

import CallButtons from './CallButtons/CallButtons';
import './Toolbar.css';

const ToolBar = (props) => (
    <Row className="ToolbarRow">
        <Col className="CallButtons">
            <CallButtons />
        </Col>
    </Row>

);

export default ToolBar;