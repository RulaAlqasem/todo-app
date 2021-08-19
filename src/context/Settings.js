import React, { useState, useEffect } from 'react';
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

    console.log(values);
    localStorage.setItem('List', JSON.stringify([...list, values]))
    setList(JSON.parse(localStorage.getItem('List')));
  }

  function handleChange(event) {
    console.log(event.target.value, "kkkkkk");
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));

  }

  let saveto = async () => {
    if (JSON.parse(localStorage.getItem('List'))) {
      setList(JSON.parse(localStorage.getItem('List')))
    }
    return () => {
      let localList = JSON.parse(localStorage.getItem('List'))

      setList(localList);
    }
  }// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    saveto().then(() => { console.log("done") })

  }, [])

  function toggleComplete(id) {


    const items = list.map((item) => {
      if (item.id === id) {

        item.complete = !item.complete;
      }
      return item;
    });
    localStorage.setItem('List', JSON.stringify(items))
    let c = JSON.parse(localStorage.getItem('List'))
    setList(c);

  }

  function deleteItem(id) {

    const items = JSON.parse(localStorage.getItem('List')).filter(item => item.id !== id);

    localStorage.setItem('List', JSON.stringify(items))
    let c = JSON.parse(localStorage.getItem('List'))
    setList(c);
  }

  return <ListContext.Provider value={{ list, handleSubmit, handleChange, toggleComplete, deleteItem, itemNumber, setItemNumber, setList }}>{props.children}</ListContext.Provider>;
}

export default List;