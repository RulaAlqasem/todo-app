
import React, { useContext, useState, useEffect } from 'react';
import "./list.scss"

import { Card, Button } from "@blueprintjs/core";
// import { Colors } from "@blueprintjs/core";

import { ListContext } from '../context/Settings';

function List(props) {

  const { list, toggleComplete, deleteItem } = useContext(ListContext);

  const [start, setStart] = useState(0);
  const [pages, setPages] = useState(3);
  const [done, setDone] = useState([]);
  const [a, setA] = useState("on");


  function nextPage(number) {
    if (start + number < 0) return;
    setStart(start + number);
    setPages(pages + number);
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

  const listOfTodos = done.slice(start, pages).map((item, idx) => {

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

      <button className={a} onClick={displayComplete}>
        incomplete
      </button>
      <ul >
        {listOfTodos}
      </ul>
      <button className="btn" onClick={() => nextPage(-3)}>previous</button>

      <button className="btn" onClick={() => nextPage(3)}>next</button>
    </div>
  )
}

export default List
