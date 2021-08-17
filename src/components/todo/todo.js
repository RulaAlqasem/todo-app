
import React, { useContext, useEffect, useState } from 'react';

import "./todo.css"
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import List from '../List'



import { FormGroup, InputGroup, Button, Navbar, Label } from "@blueprintjs/core";
// import { Label } from 'blueprint-components';

import { ListContext } from '../../context/Settings';

const ToDo = (props) => {
  const { handleSubmit, handleChange } = useContext(ListContext);

  const [incomplete, setIncomplete] = useState([]);
  const listObject = useContext(ListContext);





  useEffect(() => {
    let incompleteCount = listObject.list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [listObject.list, incomplete]);


  return (
    <>
      <Navbar>
        <h1>To Do List: {incomplete} items pending</h1>
      </Navbar>
      <card className='app'>
        <FormGroup  >

          <h2 intent="danger">Add To Do Item</h2>

          <Label intent="danger">
            <span>To Do Item</span>
            <InputGroup onChange={handleChange} name="text" type="text" placeholder="Item Details" intent="danger" autoComplete="off" />
          </Label>

          <Label intent="danger">
            <span>Assigned To</span>
            <InputGroup onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" intent="danger" autoComplete="off" />
          </Label>

          <Label>
            <span>Difficulty</span>
            < input onChange={handleChange} defaultValue={5} type="range" min={1} max={10} name="difficulty" intent="danger" class="range" />
          </Label>

          <Label>
            <Button className="btn" type="click" onClick={handleSubmit} >Add Item</Button>
          </Label>
        </FormGroup>
      </card>


      <List />
    </>
  );
};

export default ToDo;
