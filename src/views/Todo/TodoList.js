import React, { Component, PropTypes } from 'react';
import {
  FormGroup, Input, Button} from "reactstrap";
import { firebaseConnect } from 'react-redux-firebase'
import Item from './Item';


@firebaseConnect()
export default class TodoList extends Component {

  updateTodo = (id, description) => {
    const { scrumDetails, name, firebase} = this.props; 
    const scrumId = scrumDetails && scrumDetails.id;
    const todos = scrumDetails && scrumDetails[name]
    const index = todos.findIndex((todo) => todo.id == id)
    todos[index].description = description    
   
    delete scrumDetails.id;
    scrumDetails[name] = todos;
    firebase.update(`/dailyStandup/${scrumId}/`, scrumDetails)
  }

  deleteTodo = (id) => {
    const { scrumDetails, name, firebase} = this.props; 
    const scrumId = scrumDetails && scrumDetails.id;
    const todos = scrumDetails && scrumDetails[name]
    const index = todos.findIndex((todo) => todo.id == id)

    todos.splice(index, 1);   
   
    delete scrumDetails.id;
    scrumDetails[name] = todos;
    firebase.update(`/dailyStandup/${scrumId}/`, scrumDetails)
  }


  render() {
    const { scrumDetails, name } = this.props;
    const todos = scrumDetails && scrumDetails[name]

    var items = todos && todos.map((todo, index) => {
      return (
        <Item itemClass={name} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} key={index} todo={todo} />
      );
    });
    
    return (
      <ul className="todo-list">
        {items}
      </ul>
    )
  }
}