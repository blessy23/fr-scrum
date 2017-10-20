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
const moment = require('moment');

const populates = [
  { child: 'userId', root: 'users',}
]

@firebaseConnect(props =>[
  {
   path: 'daily_status',
   storeAs: `dailyStatus${props.type||0}`,
   populates,
   queryParams: [
     'orderByChild=createdDate',
     'notParsed',
     props.type==='1' ? `startAt=${getMonday()}` : `equalTo=${getCurrentDate()}`,
   ]
  }
])
@connect(({ firebase }, props) => ({
  dailyStatusList: getArrayFromObject(populatedDataToJS(firebase, `dailyStatus${props.type||0}`, populates))
}))
class WeeklyStatus extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    dailyStatusList: PropTypes.array,
  }

  state = { 
    dailyStatusList: this.props.dailyStatusList ? this.props.dailyStatusList : [],
  }

  render() {
    const weeklyStatus = [];
    const {dailyStatusList} = this.props;
    dailyStatusList.sort(function(a, b) {
        var aCreatedDate = parseInt(a.createdDate);
        var bCreatedDate = parseInt(b.createdDate);
        return bCreatedDate - aCreatedDate;
    });


    {
      dailyStatusList.forEach((dailyStatus) => {
        const momentDate = moment(dailyStatus.createdDate, "YYYYMMDD");
        const dayOfWeek = momentDate.format('dddd');
      
         weeklyStatus.push(
           <div key={status.id}>
            <div className={`priority ${dayOfWeek}`}><span>{dailyStatus.userId && dailyStatus.userId.info && dailyStatus.userId.info.firstName}</span> {momentDate.format('dddd MMMM Do YYYY')}</div>
                <div className={`task ${dayOfWeek}`}>
                  <div className="desc">
                    <div 
                      
                      dangerouslySetInnerHTML={{ __html: dailyStatus.status } } 
                    />
                  </div>                 
                </div>
              </div>)
      })

    }
    return (
      <div className="animated fadeIn"> 
        <div className="container page-todo">
        <div className="tasks">
          <div className="task-list">
            {weeklyStatus}
          <div className="clearfix"></div>		
          </div>		
        </div>
        </div>
      </div>

    )
  }
}

export default WeeklyStatus;
