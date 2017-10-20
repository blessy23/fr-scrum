import React, { Component, PropTypes } from "react";
import {
  Badge, Row, Col, Card, CardHeader, CardFooter, 
  CardBlock, Label, Input,
  FormGroup,
  FormText,
  Button
} from "reactstrap";
import { connect } from 'react-redux'
import { getCurrentDate, getMonday, getFriday } from 'utils/date';
import { getArrayFromObject } from 'utils/data';
import { firebaseConnect, populatedDataToJS, pathToJS, isLoaded, dataToJS } from 'react-redux-firebase'
import FollowUpModal from './FollowUpModal'


const moment = require('moment');
const populates = [
  { child: 'userId', root: 'users',}
]

@firebaseConnect(props =>[
  {
   path: 'follow_up',
   storeAs: `follow_up_${props.type||0}`,
   populates,
   queryParams: [
     'orderByChild=createdDate',
     'notParsed',
   ]
  }
])
@connect(({ firebase }, props) => ({
  followUps: getArrayFromObject(populatedDataToJS(firebase, `follow_up_${props.type||0}`, populates))
}))
class FollowUp extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    followUps: PropTypes.array,
  }

  state = { 
    followUps: this.props.followUp ? this.props.followUp : [],
    modal: false,
    followUp: {},
  }

  editFollowUp = (followUp) => {
    this.setState({
      followUp,
      modal: true,
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const followUpList = [];
    const { followUps } = this.props;
    followUps.sort(function(a, b) {
        var aCreatedDate = parseInt(a.createdDate);
        var bCreatedDate = parseInt(b.createdDate);
        return bCreatedDate - aCreatedDate;
    });


    {
      followUps.forEach((followUp) => {
        const momentDate = moment(followUp.createdDate, "YYYYMMDD");
        const dayOfWeek = momentDate.format('dddd');
      
        followUpList.push(
           <div key={followUp.id}>
            <div className={`priority ${dayOfWeek}`}><span>{momentDate.format('dddd')} - {momentDate.format('MMMM Do YYYY')}</span>
              <Button color="link" onClick={() =>this.editFollowUp(followUp)} className="pull-right align-self-start" style={{ marginTop: -8 + 'px' }}>
              <i className="fa fa-edit"></i>&nbsp; Edit</Button>
            </div>
                <div className={`task ${dayOfWeek}`}>
                  <div className="desc">
                    <div 
                      
                      dangerouslySetInnerHTML={{ __html: followUp.description } } 
                    />
                  </div>                 
                </div>
              </div>)
      })

    }
    return (
      <div className="animated fadeIn"> 
  
        <div className="container page-todo">
        <Button size="sm" color="primary" onClick={this.toggle}>New Follow Up</Button>
        <FollowUpModal toggle={this.toggle} modal={this.state.modal} followUp={this.state.followUp} firebase={this.props.firebase}  />
        <div className="tasks">        
          <div className="task-list">
            {followUpList}
          <div className="clearfix"></div>		
          </div>		
        </div>
        </div>
      </div>

    )
  }
}

export default FollowUp;
