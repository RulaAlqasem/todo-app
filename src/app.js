
import React, { useEffect, useState } from 'react';


import { v4 as uuid } from 'uuid';

import ToDo from './components/todo/todo';
import useForm from './hooks/form';

import List from './components/List'



function App(props) {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);


  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    let items = []
    list.map((ele, idx) => {
      if (id === idx) {
        return
      } else {
        items.push(ele)
      }
    })
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map((item, idx) => {
      if (id === idx) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);




  return (
    <div>
      <ToDo handleChange={handleChange} handleSubmit={handleSubmit} toggleComplete={toggleComplete} />
      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
    </div>
  )
}

export default App
