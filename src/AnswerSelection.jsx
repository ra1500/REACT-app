import React from "react";

class AnswerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.buttonInput = React.createRef();
    this.focusButtonInput = this.focusButtonInput.bind(this);
  }

  focusButtonInput() {
    this.buttonInput.current.focus();
    this.props.onClick();
  }


  render() {
    if (this.props.answer == null || this.props.answer == "") {
        return (null)
    }
    else {
        return (
            <button ref={this.buttonInput} className="qbutton" onClick={this.focusButtonInput} > {this.props.answer} </button>
        ) // end return
    }
  } // end render
} // end class

export default AnswerSelection;