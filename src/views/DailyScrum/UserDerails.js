import React, {Component} from "react";
import {
  FormGroup,
  FormText,Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Label, Input, Button} from "reactstrap";
import classnames from "classnames";
import { firebaseConnect, pathToJS, isLoaded, dataToJS, populatedDataToJS } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { getCurrentDate } from 'utils/date';
import { getFirstEntry } from 'utils/data';
import ScrumForm from './ScrumForm';
import { firebase } from 'react-redux-firebase'

export default class UserDetails extends Component {

  state = { 
      activeTab: '1',
      scrumDetails: this.props.scrumDetails ? this.props.scrumDetails : {},
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    const state = { 
      activeTab: '1',
      scrumDetails: this.props.scrumDetails ? this.props.scrumDetails : {},      
    };
    this.setState(state);
  }

  

  render() {
    const  { scrumDetails, user, prevScrum } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col style={{paddingLeft: '0px'}}>
            <Nav tabs>
              <NavItem > 
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Standup
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <ScrumForm 
                  scrumDetails={scrumDetails}
                  prevScrum={prevScrum}
                  user={user}
                />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    )
  }
}
