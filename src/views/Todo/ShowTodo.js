import React, {Component, PropTypes} from 'react'
import TodoList from './TodoList'
import { firebaseConnect, pathToJS } from 'react-redux-firebase'
import { getCurrentDate } from 'utils/date';
import {
  FormGroup,
   Input, Button, InputGroup, InputGroupButton} from "reactstrap";
import { connect } from 'react-redux';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    profile: pathToJS(firebase, 'profile'),
  })
)
export default class ShowTodo extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    key: PropTypes.string,
    profile: PropTypes.object,
  }

  state= {
    todo: {},
  }

  handleChange = (event) => {
    let fieldId = event.target.name;
    const value = event.target.value;
    const todo = { [fieldId]: value};
    this.setState({
      todo,
    });
  }

  handleSave = () => {
    //let scrumDetails =  this.props.scrumDetails;
    const {scrumDetails, user, name, firebase}=this.props
    const id = this.props.firebase.database().ref(`/dailyStandup`).push().key
    const todo = {...this.state.todo, id}

    if(scrumDetails && scrumDetails.id) {
      const scrumId = scrumDetails.id;
      delete scrumDetails.id;
      const todos = scrumDetails[name] || [];

      todos.push(todo);
      scrumDetails[name] = todos;
      firebase.update(`/dailyStandup/${scrumId}/`, scrumDetails)
    } else {
      this.props.firebase.push('/dailyStandup', 
      { [name]:[todo],
        userId: user.uid, 
        createdDate: getCurrentDate(), 
        uidDate: `${user.uid}~${getCurrentDate()}`         

      });
    }
    this.setState({
      todo:{description:''},
    });
  }

  // updateTodo = (todos) => {
  //   const { scrumDetails, name, firebase } = this.props
  //   const scrumId = scrumDetails.id;
  //   delete scrumDetails.id;
  //   scrumDetails[name] = todos;
  //   firebase.update(`/dailyStandup/${scrumId}/`, scrumDetails)
  // }

  handleKeyPress=(target) => {
    if(target.charCode==13){
      this.handleSave();
    }
  }

  render() {
    const {scrumDetails, profile, user, name}=this.props

    return (
      <div>
        <TodoList name={name}
          scrumDetails={scrumDetails}
        />
       { profile.info.uid === user.uid || profile.info.isScrumMaster === true ? <FormGroup>
         <div className="controls">
            <div className="input-group">
              <Input value={this.state.todo.description} name="description" onChange={this.handleChange}  onKeyPress={this.handleKeyPress} />
              <div className="input-group-btn" style={{minWidth:'0px'}}><Button  onClick={this.handleSave} color="btn btn-primary btn-sm"><i className="fa fa-plus fa-sm mt-2"></i></Button></div>
            </div>
          </div>
        </FormGroup> : null
       }
      </div>
    )
  }
}