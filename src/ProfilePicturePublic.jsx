import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class ProfilePicturePublic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPicture: "./profiledefault.jpg",
            showProfilePicture: false,
            url: null,
        };
    }

componentDidMount() {
    this.getProfilePicture();
}

  getProfilePicture() {
      //let url = this.props.location.search;
      let params = queryString.parse(this.props.url);
      let user = params.id;
    axios({
      method: 'get',
      url: "http://localhost:8080/api/files/pp?id=" + user,
      responseType: 'blob',
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
        showProfilePicture: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

    render() {
        return (
        <React.Fragment>

        { !this.state.showProfilePicture &&
         <div>
         <img id="profilePic" src={this.state.defaultPicture}></img>
         </div> }

      { this.state.showProfilePicture &&
          <div>
            <img id="profilePic" src={this.state.profilePicture}></img>
          </div> }

      </React.Fragment>
        )
    }

}



export default ProfilePicturePublic;