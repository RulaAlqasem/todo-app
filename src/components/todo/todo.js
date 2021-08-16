import React from 'react';


import { v4 as uuid } from 'uuid';
import "./todo.css"
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";



import { FormGroup, InputGroup, Button, Navbar, Label } from "@blueprintjs/core";
// import { Label } from 'blueprint-components';


const ToDo = (props) => {


  return (
    <>
      <Navbar>
        <h1>To Do List: {props.incomplete} items pending</h1>
      </Navbar>
      <card className='app'>
        <FormGroup  >

          <h2 intent="danger">Add To Do Item</h2>

          <Label intent="danger">
            <span>To Do Item</span>
            <InputGroup onChange={props.handleChange} name="text" type="text" placeholder="Item Details" intent="danger" />
          </Label>

          <Label intent="danger">
            <span>Assigned To</span>
            <InputGroup onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" intent="danger" />
          </Label>

          <Label>
            <span>Difficulty</span>
            < input onChange={props.handleChange} defaultValue={5} type="range" min={1} max={10} name="difficulty" intent="danger" class="range" />
          </Label>

          <Label>
            <Button type="click" onClick={props.handleSubmit} iconName="cog" intent="danger">Add Item</Button>
          </Label>
        </FormGroup>
      </card>



    </>
  );
};

export default ToDo;
