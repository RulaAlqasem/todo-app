
import React, { useContext, useState, useEffect } from 'react';
import "./list.scss"

import { Card, Button, Icon, Label } from "@blueprintjs/core";
// import { Colors } from "@blueprintjs/core";

import { ListContext } from '../context/Settings';



function List(props) {

  const { list, toggleComplete, deleteItem, itemNumber, setItemNumber, setList } = useContext(ListContext);


  const [done, setDone] = useState([]);
  const [a, setA] = useState("on");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemNumber);

  function next() {
    setStartIndex(startIndex + itemNumber - 1);
    setEndIndex(endIndex + itemNumber);
  }

  // === === previous === === //
  function previous() {
    setStartIndex(startIndex - itemNumber);
    setEndIndex(endIndex - itemNumber);
  }

  function pagination() {
    let result = list.slice(startIndex, endIndex);
    console.log('😏', result);
    return result;
  }

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(itemNumber);
  }, [itemNumber]);


  function handlePaginationChange(e) {
    setItemNumber(e.target.value);
  }

  function displayComplete() {
    if (done === list)
      setDone(() => done.filter((item) => item.complete !== true));
    else setDone(list);

    done === list ? setA('off') : setA('on')
  }

  useEffect(() => {
    setDone(list);
  }, [list]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('List'))) {
      setList(JSON.parse(localStorage.getItem('List')))
    }
    return () => {
      let localList = JSON.parse(localStorage.getItem('List'))
      console.log(localList)
      setList(localList);
    }
  }, [])

  const listOfTodos = pagination().map((item, idx) => {

    let deff;
    if (item.difficulty > 7) { deff = 'hard' }
    else if (item.difficulty > 5 && item.difficulty <= 7) { deff = 'medium' }
    else { deff = 'easy' }
    return (
      <Card className={deff}>
        <p>todo: {item.text}</p>
        <p>Assigned to: {item.assignee}</p>
        <p>difficulty : {deff}</p>

        <Button className="btn" onClick={() => toggleComplete(item.id)}>{item.complete ? 'complete' : "incomplete"}</Button>
        <Button className="btn" onClick={() => deleteItem(item.id)}>Delete</Button>
      </Card>
    )
  });



  return (
    <div >
      <Label>
        <Label>Items Per Page</Label>

        <input onChange={handlePaginationChange} defaultValue={3} type="range" min={1} max={5} name="items-per-page" />
      </Label>

      <Button className={a} onClick={displayComplete}>
        incomplete
      </Button>
      <ul >
        {listOfTodos}
      </ul>
      <Icon icon="double-chevron-left" onClick={() => next()}></Icon>
      <Icon icon='double-chevron-right' onClick={() => previous()}></Icon>
    </div>
  )
}

export default List
