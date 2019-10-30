import React from "react";
import axios from 'axios';

class A extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          //friend: null,
        };
  }

    componentDidMount() {
        //this.getFriendships();
    }

  render() {
    return (
    <React.Fragment>

    </React.Fragment>
    );
  }
}

export default A;