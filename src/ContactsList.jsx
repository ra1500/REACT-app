import React from 'react';

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.allData.data.friendsList, //
            //dataString: JSON.stringify(props.allData),
        };
    }

    render() {
        let { list,dataString} = this.state;


        return (
        <React.Fragment>
        <div>
            {dataString}
         </div>
            <ul>
              {list.map(data => (
                <li key={data.friend}>
                  <div>{data.friend}</div>
                  <div>{data.status}</div>
                </li>
              ))}
            </ul>
        <div>

         </div>
        </React.Fragment>
        )
    }

}

export default ContactsList;