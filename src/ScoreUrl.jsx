import React from "react";

class ScoreUrl extends React.Component {
  constructor(props) {
    super(props);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {userName: u,};
  }

  render() {
    let { userName } = this.state;
    return (
    <div id="scoreurl">
        <p className="urltext">Your score URL: www.neuraljuice.com/us/scores?gid={userName}<br></br>
        share it on facebook etc.<br></br>
        toggle here to make it private </p>
    </div>

    );
  }
}

export default ScoreUrl;