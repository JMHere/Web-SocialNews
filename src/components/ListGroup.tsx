//import { Fragment } from "react";
//import { MouseEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// { itmes: [], heading: string}
interface ListGroupProps {
  items: [];
}

function ListGroup({ items }: ListGroupProps) {
  // items = [];
  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //arr[0]; // variable (selectedIndex)
  //arr[1]; // updater function

  // Type anotation
  const handleClick = (event: MouseEvent) => console.log(event);

  // function in react

  // if statment in react
  //   if (items.length === 0)
  //     return (
  //       <>
  //         <h1>List</h1>

  //       </>
  //     );

  return (
    //Fragment used to be able to have multiple tags
    //<Fragment>
    //Fragment tag without the word fragment
    <>
      <ul className="list-group">
        {items.map((item, index) => (
          <div>
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                //onSelectItem(item)
              }}
            >
              {item.username}
            </li>
            <li>
              <Link to={"/userPage/" + item.pageId}>{item.username}</Link> 
            </li>
          </div>
        ))}
        
      </ul>
    </>
    //</Fragment>
  );
}

export default ListGroup;
