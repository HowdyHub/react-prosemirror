import React from 'react'
import './Prompt.css'

export default class Prompt extends React.Component {
  static defaultProps = {
    input: {
      name: 'linkUrl',
      className: 'input'
    },
    button: {
      className: 'button',
      copy: 'Add'
    }
  }

  constructor(props) {
    super(props);

    this.state = { show: false }
  }

  show(onValueAdded) {
    this.onValueAdded = onValueAdded
    this.setState({ show: true })
  }

  hide(ev = null) {
    if(ev) { ev.preventDefault(); }
    this.setState({ show: false })
  }

  useValue(ev) {
    ev.preventDefault();

    let input = ev.currentTarget.parentElement.querySelector('input');
    if(input.checkValidity()) {
      this.onValueAdded(input.value);
      this.hide();
    } else {
      this.refs.error.classList.add('error-message');
      this.refs.error.innerText = input.validationMessage;
    }
  }

  render() {
    if(!this.state.show) { return null; }

    const inputProps = this.props.input,
      buttonProps = this.props.button;

    return (
      <div>
        <a href="#" onClick={this.hide.bind(this)} className="close-prompt">X</a>
        <span ref="error" />
        <input type="url" required name={inputProps.name} className={inputProps.className} pattern="^(https){1}:\/\/.+$"/>
        <button type="button" onClick={this.useValue.bind(this)} className={buttonProps.className}>{buttonProps.copy}</button>
      </div>
    )
  }
}
