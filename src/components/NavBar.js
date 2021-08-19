import React from 'react'
import { FormGroup, InputGroup, Button, Navbar, Label } from "@blueprintjs/core";
import Login from './login'

function NavBar() {
  return (

    <Navbar>
      <Login />
      <h1 style={{

        "width": "137px", "position": "relative", "bottom": "55px", "left": "46px",
      }}>To Do List</h1>
    </Navbar>

  )
}

export default NavBar
