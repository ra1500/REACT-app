import React from "react";
import axios from 'axios';

class QuestionSetsPrivateProfile extends React.Component {
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
        this.getQsets();
    }

    handleSubmit() {
    }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/du",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({showList: true});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td>  {data.questionSetVersionEntity.title} </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }
   renderTableHeader() {
      let header = ["Title", "Description"]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }
   render() {
    return (
        <React.Fragment>

        { this.state.showList &&
         <div>
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetsPrivateProfile;