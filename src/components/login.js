import React, { Component, useState, useContext } from 'react'
import { AuthContext } from '../context/auth';
import { If, Else, Then } from 'react-if';
import { FormGroup, InputGroup, Button, Card, Label } from "@blueprintjs/core";



function Login(props) {
  const { loggedIn, logout, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")



  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleChange1 = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
  }

  return (

    <If condition={loggedIn}>
      <Then>
        <Button intent="danger" onClick={logout}>Logout</Button>
      </Then>
      <Else>
        <form intent="danger" onSubmit={handleSubmit} style={{ "width": "28rem", "margin-left": "auto", "margin-top": "0px", "padding-top": "11px" }}>
          <input intent="danger" type="text" name="username" placeholder="Enter Username" onChange={handleChange} />
          <input intent="danger" type="text" name="password" placeholder="Enter Password" onChange={handleChange1} />
          <Button intent="danger" >Login</Button>
        </form>
      </Else>
    </If>

  )
}

export default Login

