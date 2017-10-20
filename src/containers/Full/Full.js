import React, { PureComponent, PropTypes } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import DailyScrum from '../../views/DailyScrum/';
import DailyStatus from 'views/DailyStatus';
import WeeklyStatus from 'views/WeeklyStatus';
import FollowUp from 'views/FollowUp';

import {
  firebaseConnect,
  pathToJS,
  dataToJS
} from 'react-redux-firebase';
import { connect } from 'react-redux';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';


// @connect(
//   ({ firebase }) => ({
//     auth: pathToJS(firebase, 'auth'),
//     users: dataToJS(firebase, '/users'),
//   })
// )
class Full extends PureComponent {
  static propTypes = {
    auth: PropTypes.object,
  }

  // componentWillReceiveProps({ auth, users }) {
  //   if (!localStorage.getItem('userId')) {
  //     this.props.history.push('/login') // redirect to /login if not authed
  //   }
  // }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/scrum" name="Daily Scrum" component={DailyScrum}/>
                <Route path="/eod-status" name="5:30 Status" component={DailyStatus}/>
                <Route path="/weekly-status" name="Weekly Status"  render={(props) => (<WeeklyStatus type="1" {...props}/>)} />
                <Route path="/daily-status" name="Daily Status" component={WeeklyStatus}/>
                <Route path="/follow-up" name="Follow Up" component={FollowUp}/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
        {
          !localStorage.getItem('userId') && (
            <Redirect to={'/login'}/>
          )
        }
      </div>
    );
  }
}


export default withRouter(Full);
