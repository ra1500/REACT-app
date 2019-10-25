import React from "react";

class AnswerSelection extends React.Component {
//  constructor(props) {
//    super(props);
//  }

  render() {
    if (this.props.answer == null) {
        return (null)
    }
    else {
        return (
            <button className="qbutton" onClick={this.props.onClick}> {this.props.answer} </button>
        ) // end return
    }
  } // end render
} // end class

export default AnswerSelection;