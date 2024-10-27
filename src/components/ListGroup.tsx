//import { Fragment } from "react";
//import { MouseEvent } from "react";
import { useState } from "react";

// { itmes: [], heading: string}
interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // items = [];
  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //arr[0]; // variable (selectedIndex)
  //arr[1]; // updater function

  // Type anotation
  const handleClick = (event: MouseEvent) => console.log(event);

  // function in react
  const getMessage = () => {
    return items.length === 0 && <p>No items found</p>;
  };

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
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
    //</Fragment>
  );
}

export default ListGroup;
