import React from "react";
import axios from 'axios';

class ProfileText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    title: null,
    blurb: null,
    education: null,
    occupation: null,
    relationshipStatus: null,
    location: null,
    contactInfo: null,
    selectProfile: null,
    updatedMessage: null,
    education2: null,
    relationshipStatus2: null,
    };
  }

  componentDidMount() {
    this.getProfileText();
  }

  getProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pr",
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        title: response.data.title,
        blurb: response.data.blurb,
        education: response.data.education,
        occupation: response.data.occupation,
        relationshipStatus: response.data.relationshipStatus,
        location: response.data.location,
        contactInfo: response.data.contactInfo,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "Irrelevant"})};
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

  handleChange1(event) {
    this.setState({occupation: event.target.value});
  }
     handleChange2(event) {
       this.setState({title: event.target.value});
     }
     handleChange3(event) {
       this.setState({blurb: event.target.value});
     }
     handleChange4(event) {
       this.setState({education: event.target.value});
      if (event.target.value === "1") {this.setState({education2: "High School"})};
      if (event.target.value === "2") {this.setState({education2: "College"})};
      if (event.target.value === "3") {this.setState({education2: "Masters"})};
      if (event.target.value === "4") {this.setState({education2: "Phd or MD"})};
      if (event.target.value === "5") {this.setState({education2: "Irrelevant"})};
     }
     handleChange5(event) {
       this.setState({relationshipStatus: event.target.value});
      if (event.target.value === "1") {this.setState({relationshipStatus2: "Available"})};
      if (event.target.value === "2") {this.setState({relationshipStatus2: "Not Available"})};
      if (event.target.value === "3") {this.setState({relationshipStatus2: "Irrelevant"})};
     }
     handleChange6(event) {
       this.setState({location: event.target.value});
     }
     handleChange7(event) {
       this.setState({contactInfo: event.target.value});
     }

  handleSubmit1(event) {
    event.preventDefault();
    if (this.state.occupation === null) {
        this.state = {occupation: ""}; // Magic 1 of 3!
    }
    else {
        this.setState({occupation: this.state.selectProfile}); // magic 2 of 3.
    }
    if (this.state.education === null) {
        this.state = {education: "5"}; // Magic 1 of 3!
    }
    else {
        this.setState({education: this.state.selectProfile}); // magic 2 of 3.
    }
    if (this.state.relationshipStatus === null) {
        this.state = {relationshipStatus: "3"}; // Magic 1 of 3!
    }
    else {
        this.setState({relationshipStatus: this.state.selectProfile}); // magic 2 of 3.
    }
    this.postProfileText();
  }

  postProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {title : this.state.title, blurb: this.state.blurb, education: this.state.education, occupation: this.state.occupation,
     relationshipStatus: this.state.relationshipStatus, location: this.state.location, contactInfo: this.state.contactInfo,};  // Magic 3 of 3
    axios.post("http://localhost:8080/api/user/pf", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
            publicProfile: response.data.publicProfile,
            updatedMessage: " Profile has been updated.",
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="meSettingsDiv">
        <p>Profile </p>

          <div class="askDiv"><span class="askText">Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.title} onChange={this.handleChange2}  autocomplete="off" placeholder="optional: name & occupation"/>
          </div>
          <div class="askDiv"><span class="askText">Blurb &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.blurb} onChange={this.handleChange3}  autocomplete="off" placeholder="optional: self-description"/>
          </div>
          <div class="askDiv"><span class="askText">Location &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.location} onChange={this.handleChange6}  autocomplete="off" placeholder="optional: city, state, country"/>
          </div>
          <div class="askDiv"><span class="askText">Contact Info. &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.contactInfo} onChange={this.handleChange7}  autocomplete="off" placeholder="optional: email or phone# etc."/>
          </div>
        <form>
            <p class="paragraphInline"> Relationship Status: {this.state.relationshipStatus2} &nbsp; &nbsp;</p>
            <div class="radioSelections">
              <label><input value="1" onChange={this.handleChange5} type="radio" name="optradio" /> Available </label>
            </div>
            <div class="radioSelections">
              <label><input value="2" onChange={this.handleChange5} type="radio" name="optradio" /> Not Available </label>
            </div>
            <div class="radioSelections">
              <label><input value="3" onChange={this.handleChange5} type="radio" name="optradio" /> Irrelevant </label>
            </div>
        </form>
            <button type="submit" onClick={this.handleSubmit1} className="inviteAuditButton"> Update </button>
            <span class="updateParagraph">{this.state.updatedMessage}</span>
    </div>

    );
  }
}

export default ProfileText;