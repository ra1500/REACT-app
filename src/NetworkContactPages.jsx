import React from "react";
import axios from 'axios';
import ScoresNetworkContactPages from "./ScoresNetworkContactPages";

class NetworkContactPages extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
    }

  render() {
    return (
    <React.Fragment>
        <ScoresNetworkContactPages friendId={this.props.friendId}/>
    </React.Fragment>
    );
  }
}

export default NetworkContactPages;