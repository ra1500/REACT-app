import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class PublicUserPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            list: null,
            showList: false,
            id: null,
        };
    }

  componentDidMount() {
    this.getQsets();
  }

   displayUserName() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let user = params.id;
        this.setState({userName: user});
   }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dc",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({showList: true});
          this.displayUserName();
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.questionSetVersionEntity.title} &nbsp; &nbsp;</td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
               <td> &nbsp;{data.score} </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score"]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }

    render() {
        return (
        <React.Fragment>
            <a id="NJ" href="/"> NeuralJuice </a>
            <p id="profileUserName"> I am {this.state.userName}</p>

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
        )
    }

}

export default PublicUserPages;