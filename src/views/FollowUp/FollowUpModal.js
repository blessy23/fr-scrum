import React, { Component, PropTypes } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextEditor from 'components/TextEditor';
import { getCurrentDate, getMonday, getFriday } from 'utils/date';

const placeHolderText = `<ol>
<li><strong>Pivotal Story: </strong><a href="Story Link">Story link</a>
  <ol>
    <li>question 1</li>
    <li>question 2</li>
  </ol>
</li>
</ol>`;

export default class FollowUpModal extends Component {

  state = {    
    isEditing: false,
    followUp: {},
  }

  handleChange = (description) => {
    const followUp = {...this.state.followUp, description};
    this.setState({
      followUp,
    });
  }

  handleSave = () => {
    let followUp =  this.state.followUp;

    if(this.props.followUp && this.props.followUp.id) {
      delete followUp.id;
      this.props.firebase.update(`/follow_up/${this.props.followUp.id}/`, followUp)
    } else {
      this.props.firebase.push('/follow_up', 
      { ...followUp, 
        userId: localStorage.getItem('userId'), 
        createdDate: getCurrentDate(), 
        uidDate: `${localStorage.getItem('userId')}~${getCurrentDate()}` 
      });
    }
    this.props.toggle();
  }

  render() {

    return (
      <div>
       
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop='static' className='modal-lg modal-primary'>
          <ModalHeader toggle={this.toggle}>Follow Up</ModalHeader>
          <ModalBody>            
            <TextEditor content={this.props.followUp.description || ''} onChange={this.handleChange}  />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSave}>Send</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
