import React from 'react';
import ToDo from './components/todo/todo';
import Login from './components/login';
import AuthProvider from './context/auth';
import Signup from './components/Signup';
import Auth from './components/auth';
import ListContext from './context/Settings';
import NavBar from './components/NavBar';







function App(props) {
  return (
    <AuthProvider>
      <NavBar />
      <Auth capability="read">
        <ListContext>
          <ToDo />
        </ListContext>
      </Auth>
    </AuthProvider>
  )
}

export default App
