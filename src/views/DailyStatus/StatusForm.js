import React, { Component, PropTypes } from 'react';
import {
  FormGroup,
  FormText,Label, Input, Button,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
} from "reactstrap";
import TextEditor from 'components/TextEditor';

const placeHolderText = `
<p><strong>Work Done:</strong></p>
  <ul>
    <li>Provide details of what you did today (completed tasks). Use active verbs to start the sentences: completed, solved, organized, rebuilt are a few examples.</li>
    <li>Sentences like, 'Doing my task', 'Continued my task', 'Discussed our project' convey no meaning. Be specific about each task you have done or intend to do</li>
  </ul>
  <p><strong>To Do:</strong></p>
  <ul>
    <li>List the work you plan to do tomorrow</li>
    <li><strong>Pivotal story description:</strong> pivotal story link</li>
  </ul>
  <p><strong>Open Issues:</strong></p>
  <ul>
    <li>Discuss any problems you faced while performing your tasks. In this section, you can clarify any need for guidance or help.</li>
  </ul>
  <p><br>
</p>`;

class StatusForm extends Component {
  

  render() {
    const { dailyStatus, onSave, onChange, isEditing } = this.props;
    
    return (
       <Card>
      
        
       <TextEditor placeholder={placeHolderText} content={dailyStatus} readOnly={!isEditing} onChange={onChange} />

        <CardFooter>
        {
          isEditing ?  <Button type="button" onClick={this.props.onSave} size="sm" color="primary pull-right"><i className="fa fa-dot-circle-o"></i>Save</Button>
                    :  <Button type="button" onClick={this.props.toggleEdit} size="sm" color="primary pull-right"><i className="fa fa-dot-circle-o"></i>Edit</Button>
        }
        </CardFooter>
        
      </Card>
    );
  }
}

StatusForm.propTypes = {
  dailyStatus: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

export default StatusForm;