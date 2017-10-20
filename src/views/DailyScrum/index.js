import React, { Component, PropTypes } from "react";
import {
  Badge, Row, Col, Card, CardHeader, CardFooter, 
  CardBlock, Label, Input,
  Form,
  FormGroup,
  Button ,
} from "reactstrap";
import { getCurrentDate, getLastWorkingDay } from 'utils/date';

import UserDetails from './UserDerails';
import { firebaseConnect, pathToJS, isLoaded, dataToJS, populatedDataToJS } from 'react-redux-firebase'
import { connect } from 'react-redux';
import { getUsers } from 'redux/mappings/userMappings';

const populates = [
  { child: 'userId', root: 'users',}
]

const UserCards = (props) => (
  <Col xs="12" sm="6" md="4">
    <Card>
      <CardHeader>
        <i className="fa fa-user"></i>{props.user.firstName}
        <div className="card-actions">
          <a href="#" className="btn-minimize"><i className="icon-arrow-up"></i></a>
        </div>
      </CardHeader>
      <CardBlock className="card-body"> 
        <UserDetails {...props} />
      </CardBlock>
    </Card>
  </Col>         
);

@firebaseConnect([
  {
    path: '/users' 
  },
  {
    path: 'dailyStandup',
    storeAs: 'scrumList',
    queryParams: [
      'orderByChild=createdDate',
      'notParsed', // keeps equalTo from automatically parsing
      'startAt=' + getLastWorkingDay().format('YYYYMMDD'),
     // 'limitToLast=2',
     // 'equalTo=' + getCurrentDate(),
      // 'createdDate='+ getCurrentDate()
    ]
   }
])
@connect(
  ({ firebase }) => ({
    users: dataToJS(firebase, '/users'),
    auth: pathToJS(firebase, 'auth'),
    scrumList: dataToJS(firebase, 'scrumList'),
    profile: pathToJS(firebase, 'profile'),
  })
)
class Cards extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    profile: PropTypes.object,
  }
  
  state = {
    isShowAllUsers: false
  }

  showAllStandup = () => {   
    this.setState({
      isShowAllUsers: true
    });
  }

  showMyStandup = () => {   
    this.setState({
      isShowAllUsers: false
    });
  }

  render() {
    const userList = [];
    const {scrumList, profile } = this.props;

    if(this.props.users) {
      Object.entries(this.props.users).forEach(([key, user]) => {
        const userCardProps = {
          ...this.props,
          user: user.info
        };
        const userId = this.state.isShowAllUsers ? user.info.uid: profile.info.uid;
        const currentScrumKey = scrumList 
        && Object.keys(scrumList).filter(function(key) {return scrumList[key].userId ===userId 
          && scrumList[key].createdDate === getCurrentDate()})[0];
        const prevScrumKey = scrumList && Object.keys(scrumList).filter(function(key) {return scrumList[key].userId ===userId 
          && scrumList[key].createdDate == getLastWorkingDay().format('YYYYMMDD')})[0];
       
        let prevScrum;
        let scrumDetails;
        
        prevScrum = prevScrumKey && { ...scrumList[prevScrumKey], id: prevScrumKey }
        scrumDetails = currentScrumKey && { ...scrumList[currentScrumKey], id: currentScrumKey }

        user.info.uid === userId ?
        userList.push(
          <UserCards key={user.info.uid} {...userCardProps} prevScrum={prevScrum} scrumDetails={scrumDetails}/>
        ): null;

      });
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col style={{paddingBottom: '5px'}}>
            <Button color="primary" onClick={this.showAllStandup}  style={{width:'120px'}}><i className="fa fa-users fa-lg mt-2"></i>     All    </Button>
            <Button color="secondary" onClick={this.showMyStandup}  style={{width:'120px'}}><i className="fa fa-user fa-lg mt-2"></i>    Mine   </Button>
          </Col>
        </Row>
        <Row>
         {userList}
        </Row>        
      </div>

    )
  }
}

export default Cards;
