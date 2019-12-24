import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

class PublicUserPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "(not found)",
            list: null,
            showList: false,
            id: null,
        };
    }

  componentDidMount() {
    this.getQsets();
  }

  getQsets() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let user = params.id;
        this.setState({userName: user});
        axios.get("http://localhost:8080/api/prm/sc/dc?id=" + user)
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showList: true,
          });
          } // end if
          else { this.setState({showList: false}); }
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
               <td> &nbsp;{data.result} </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score", "Result"]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }

    render() {
        return (
        <React.Fragment>
            <div id="titleBarDiv">
            <a id="NJ" href="/"> NeuralJuice </a>
            <div id="titleLinksDiv2">
            <p id="profileUserName">{this.state.userName}</p>
            </div>
            </ div>

        { !this.state.showList &&
         <div class="topParentDiv">
         <div class="secondParentDiv">
         <p class="alertsSmallP"> &nbsp;(nothing to see here)</p>
         </div>
         </div> }


        { this.state.showList &&
         <div class="topParentDiv">
         <div class="secondParentDiv">
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }
        </React.Fragment>
        )
    }

}

export default PublicUserPages;