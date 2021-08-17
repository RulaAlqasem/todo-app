
import React from 'react';




import ToDo from './components/todo/todo';




import ListContext from './context/Settings';

function App(props) {














  return (
    <ListContext>
      <ToDo />

    </ListContext>
  )
}

export default App
