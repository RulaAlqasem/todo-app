import React, { Component, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();





function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  let setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user);
    setLoggedIn(loggedIn);

  };


  let login = async (username, password) => {
    // headers{authorization: "Basic sdfsdfsdf="}
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
      console.log(response.body);
      validateToken(response.body.token);
    } catch (error) {
      console.error('LOGIN ERROR', error.message);
    }
  };

  let logout = () => {
    setLoginState(false, null, {});
  };

  let validateToken = (token) => {

    if (token !== 'null') {
      const user = jwt.decode(token);
      console.log(token, user);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
    }
  };
  const signup = async (username, password, role) => {
    try {
      const response = await superagent
        .post(`${API}/signup`, { username, password, role });
      validateToken(response.body.token);
    } catch (e) {
      console.error('Signup Error', e.message);

    }
  };

  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, [])


  return (
    <div>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState, signup }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}

export default Auth

