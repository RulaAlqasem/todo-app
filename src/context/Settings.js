import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
export const ListContext = React.createContext();

function List(props) {

  const [list, setList] = useState([]);
  const [values, setValues] = useState({});
  const [itemNumber, setItemNumber] = useState(3);

  function handleSubmit(event) {
    if (event) event.preventDefault();
    values.id = uuid();
    values.complete = false;
    setList([...list, values]);
    console.log(values);
    localStorage.setItem('List', JSON.stringify(list))
  }

  function handleChange(event) {
    console.log(event.target.value, "kkkkkk");
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));

  }

  function toggleComplete(id) {


    const items = list.map((item) => {
      if (item.id === id) {

        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  function deleteItem(id) {

    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  return <ListContext.Provider value={{ list, handleSubmit, handleChange, toggleComplete, deleteItem, itemNumber, setItemNumber, setList }}>{props.children}</ListContext.Provider>;
}

export default List;