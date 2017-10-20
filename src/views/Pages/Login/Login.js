import React, {Component, PropTypes} from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'

import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

@firebaseConnect()
@connect(
  // map redux state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string
    })
  }

  state = {
    user: {},
  }

  handleChange = (event) => {
    let fieldId = event.target.name;
    const value = event.target.value;
    const user = { ...this.state.user, [fieldId]: value};
    this.setState({
      user,
    });
  }


  handleLogin = loginData => {
    this.props.firebase.login(this.state.user).then((result) => {
      localStorage.setItem('userId', result);
      this.props.history.push('/scrum');
    }, (err) => {
      console.log('Filter data API Error :', err);
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" name="email" placeholder="Username"  onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password"  onChange={this.handleChange}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleLogin} >Login</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Daily Scrum</h2>
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
