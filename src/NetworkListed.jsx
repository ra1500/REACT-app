port React from 'react';

function NetworkListed(props) {
    const list2 = props.allData; // this works!
    const hi = "hi";

const list = [
  {
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
];
const ComplexList = () => (
  <ul>
    {list.map(item => (
      <li key={item.id}>
        <div>{item.firstname}</div>
      </li>
    ))}
  </ul>
);

        return (
        <React.Fragment>
        <div>{hi}  <ComplexList /> </div>
        </React.Fragment>
        )

}

export default NetworkListed;

// friendsList  gid  [userEntity   userName]