import React, { Component, PropTypes } from 'react';
import {
  FormGroup, Input, Button} from "reactstrap";

export default class Item extends Component {

  state = {
    editing: false,
  }

  componentDidMount () {
    this.setState({ description: this.props.todo.description });
  }

  handleEditing = (event) => {
    this.setState({ editing: true, description: this.props.todo.description });
  }

  handleEditingDone = (event) => {
    if (event.charCode === 13 ) { // submit
      this.setState({ editing: false });
      this.props.updateTodo(this.props.todo.id, this.state.description)
    }    
  }

  handleEditingChange = (event) => {
    var description = event.target.value;
    this.setState({ description });
  }
  
  handleCancel= (event) => {
    this.setState({ editing: false });
  }

  handleDelete= (event) => {
    this.props.deleteTodo(this.props.todo.id)
  }
  
  render() {
    const { todo, itemClass } = this.props;

    var viewStyle = {};
    var editStyle = {};

    if (this.state.editing) {
      viewStyle.display = 'none';
    } else {
      editStyle.display = 'none';
    }
    
    return (
      <ul className="todo-list">
        <li className={itemClass}>
          <div style={viewStyle} className="readOnly" onDoubleClick={this.handleEditing}>
            <span className="">{todo.description}</span>
            <div className="pull-right">
              <Button onClick={this.handleDelete} className="btn btn-link" style={{padding: '0px'}}>
                <i className="fa fa-trash-o"></i>
              </Button>
            </div>
          </div>
          <div style={editStyle} className="editMode">
                <FormGroup>
                  <Input value={this.state.description} onChange={this.handleEditingChange}  onKeyPress={this.handleEditingDone} className="form-control" type="text" name="description"/>
                </FormGroup>
                <div className="pull-right">
                  <Button color="btn btn-primary btn-sm btn-flat" onClick={this.handleCancel}>Cancel</Button>
                </div>
                <div className="clearfix"></div>           
            </div>
        </li>
      </ul>
    )
  }
}