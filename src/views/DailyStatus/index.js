import React, { Component, PropTypes } from "react";
import {
  Badge, Row, Col, Card, CardHeader, CardFooter, 
  CardBlock, Label, Input,
  FormGroup,
  FormText,
  Button
} from "reactstrap";
import { connect } from 'react-redux'
import { getCurrentDate } from 'utils/date';
import { getFirstEntry } from 'utils/data';
import { firebaseConnect, populatedDataToJS, pathToJS, isLoaded, dataToJS } from 'react-redux-firebase'
import StatusForm from './StatusForm';

var divStyle = {
  paddingLeft: 30,
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};


@firebaseConnect(props => [
  {
   path: '/daily_status',
   storeAs: `dailyStatus`,
   queryParams: [
     'orderByChild=uidDate',
     //'notParsed', // keeps equalTo from automatically parsing
     'equalTo='+`${localStorage.getItem('userId')}~${getCurrentDate()}`,
     // 'createdDate='+ getCurrentDate()
   ]
  }
])
@connect(({ firebase }, props) => ({
  dailyStatus: getFirstEntry(populatedDataToJS(firebase, 'dailyStatus'))
}))
class DailyStatus extends Component {
  static propTypes = {
    firebase: PropTypes.object
  }

  state = { 
    dailyStatus: this.props.dailyStatus ? this.props.dailyStatus : {},
    isEditing: false
  }

  handleChange = (status) => {
    const dailyStatus = { ...this.props.dailyStatus, ...this.state.dailyStatus, status};
    this.setState({
      dailyStatus,
    });
  }

  handleSave = () => {
    let dailyStatus =  this.state.dailyStatus;

    if(this.props.dailyStatus) {
      delete dailyStatus.id;
      this.props.firebase.update(`/daily_status/${this.props.dailyStatus.id}/`, dailyStatus)
    } else {
      this.props.firebase.push('/daily_status', 
      { ...dailyStatus, 
        userId: localStorage.getItem('userId'), 
        createdDate: getCurrentDate(), 
        uidDate: `${localStorage.getItem('userId')}~${getCurrentDate()}` 
      });
    }
    this.setState({isEditing: false});
  }

  toggleEdit=()=> {
    this.setState({isEditing: true});
  }

  render() {
    const statusProps = {...this.props.dailyStatus, ...this.state.dailyStatus}
    const isEditing = this.state.isEditing || !this.props.dailyStatus

    return (
      <div className="animated fadeIn"> 
        <Row>
          <Col>
            <StatusForm 
              toggleEdit={this.toggleEdit}
              isEditing={isEditing}
              onSave={this.handleSave}
              onChange={this.handleChange}
              dailyStatus={statusProps.status} 
            />
          </Col>
          </Row>          
      </div>

    )
  }
}

export default DailyStatus;
