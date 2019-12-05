import React from 'react';
import axios from 'axios';

class ScoresList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            showList: false,
            id: null,
        };
    }

  componentDidMount() {
    this.getQsets();
  }

  getQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dr",
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
            <div>
            <tr key={data.index}>
                <td> <button class="titleButton" value={data.questionSetVersionEntity} onClick={e => this.props.renderSingleScore(data.id ,data.questionSetVersionEntity.id, data.questionSetVersionEntity.title, data.questionSetVersionEntity.description, data.score,e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
                <td> &nbsp;{data.score} </td>
                <td> &nbsp;{data.result} </td>
            </tr>
            </div>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", ]
      return header.map((key, index) => {
         return <th key={index}>{key} &nbsp;&nbsp;&nbsp;   </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        { this.state.showList &&
         <div id="meSettingsDiv">
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

export default ScoresList;