import React from 'react';

class ComplexList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list2: props.allData, //

            list: [{
                id: 'a',
                firstname: 'Robin',
                lastname: 'Wieruch',
                year: 1988,
              },
              {
                id: 'b',
                firstname: 'Dave',
                lastname: 'Davidds',
                year: 1990,
              },
            ],

        }; // end of setState
    }

    render() {
        let { list, list2 } = this.state;
        return (
        <React.Fragment>
        <div>
                    <p>hi</p>
                      <ul>
                        {list.map(item => (
                          <li key={item.id}>
                            <div>{item.firstname}</div>
                          </li>
                        ))}
                      </ul>
         </div>
        </React.Fragment>
        )
    }

}

export default ComplexList;