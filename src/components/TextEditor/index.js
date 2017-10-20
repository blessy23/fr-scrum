import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
  };

  state = {
    value: null,
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {

    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', ],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    };
   
    const textContent = this.state.value ? this.state.value : this.props.content ?
    RichTextEditor.createValueFromString(this.props.content, 'html') :
    RichTextEditor.createValueFromString(this.props.placeholder||'', 'html')

    return (
      <RichTextEditor
        value={textContent}
        onChange={this.onChange}
        readOnly={!!this.props.readOnly}
        toolbarConfig={toolbarConfig} 
      />
    );
  }
}