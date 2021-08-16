import React from 'react'
import "./list.css"

import { Card } from "@blueprintjs/core";



function List(props) {
  return (
    <div >
      {
        props.list.map((item, idx) => (

          // !item.complete &&
          <Card className="card" key={item.id} interactive elevation={2}  >

            <p >{item.text}</p>
            <p ><small>Assigned to: {item.assignee}</small></p>
            <p ><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => props.toggleComplete(idx)}>Complete: {item.complete.toString()}</div>
            <div onClick={() => props.deleteItem(idx)}>delete</div>
            <hr />
          </Card >

        ))
      }
    </div>
  )
}

export default List
