import React from "react";

class ScoreUrl extends React.Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {userName: u,};
  }


  render() {
    let { userName } = this.state;
    return (
    <div id="scoreurl">
        <p className="urltext">Your score profile page: </p> <a href={'/us/scores?gid=' + userName}> www.neuraljuice.com/us/scores?gid={userName} </a>

    </div>

    );
  }
}

export default ScoreUrl;