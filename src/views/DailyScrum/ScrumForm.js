import React, { Component, PropTypes } from 'react';
import {
  FormGroup,
  FormText,
  Label,
  Input,
  Button
} from "reactstrap";

import ShowTodo from 'views/Todo/ShowTodo';
import TodoList from 'views/Todo/TodoList';

class ScrumForm extends Component {

  render() {
    const { scrumDetails, user, prevScrum } = this.props;

    return (
      <div>       
        <div className="box-header "><h4 className="box-title sub-box-title">What did you do yesterday?</h4></div>
        <TodoList name="todos" scrumDetails={this.props.prevScrum && this.props.prevScrum}/>       
        <ShowTodo name="done" scrumDetails={scrumDetails}  user={user} />
        <div className="box-header "><h4 className="box-title sub-box-title">What will you do today?</h4></div>
        <ShowTodo name="todos" scrumDetails={scrumDetails} user={user} />
        <div className="box-header "><h4 className="box-title sub-box-title">Are there any impediments in your way?</h4></div>
        <ShowTodo name="roadBlocks" scrumDetails={scrumDetails} user={user} />        
      </div>
    );
  }
}

ScrumForm.propTypes = {
  scrumDetails: PropTypes.object, 
};

export default ScrumForm;