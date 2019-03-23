import React, { Component } from 'react';

import { Nav, ListGroup, ListGroupItem, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faObjectUngroup, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'

import './Navigation.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: {
                1: false,
                2: false
            }

        }
    }

    toggle(id) {
        const tooltips = { ...this.state.tooltipOpen };
        tooltips[id] = !tooltips[id]
        this.setState({
            tooltipOpen: tooltips
        });
    }

    render() {
        return (
            <Nav vertical className="NavigationMenu">
                <ListGroup >
                    <ListGroupItem className="ListItem" id="AddNewMeet" tag="a" href="#">
                        <FontAwesomeIcon icon={faPlus} />
                        <Tooltip
                            placement="right"
                            isOpen={this.state.tooltipOpen[1]}
                            target="AddNewMeet"
                            toggle={() => this.toggle(1)}>
                            Add new meet
                        </Tooltip>
                    </ListGroupItem>
                    <ListGroupItem className="ListItem" id="SelectMeet" tag="a" href="#">
                        <FontAwesomeIcon icon={faObjectUngroup} />
                        <Tooltip
                            placement="right"
                            isOpen={this.state.tooltipOpen[2]}
                            target="SelectMeet"
                            toggle={() => this.toggle(2)}>
                            Select meet
                        </Tooltip>
                    </ListGroupItem>
                    <ListGroupItem className="ListItem" tag="a" href="#">
                        <FontAwesomeIcon icon={faFileExport} />
                    </ListGroupItem>
                    <ListGroupItem className="ListItem" tag="a" href="#">
                        <FontAwesomeIcon icon={faFileImport} />
                    </ListGroupItem>
                </ListGroup>
            </Nav>
        )
    }
}
export default Navigation;