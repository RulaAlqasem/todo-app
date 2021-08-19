import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../context/auth'
export const ListContext = React.createContext();



function List(props) {

  const [list, setList] = useState([]);
  const [values, setValues] = useState({});
  const [itemNumber, setItemNumber] = useState();
  const [a, setA] = useState("on");
  const [done, setDone] = useState([]);
  const { loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState, signup } = useContext(AuthContext);
  function handleSubmit(event) {

    if (user.capabilities.includes('create')) {
      if (event) event.preventDefault();
      values.id = uuid();
      values.complete = false;

      console.log(values);
      localStorage.setItem('List', JSON.stringify([...list, values]))
      setList(JSON.parse(localStorage.getItem('List')));
    } else { alert("you cant creat") }
  }

  function handlePaginationChange(e) {
    if (user.capabilities.includes('update')) {
      localStorage.setItem('itemNumber', JSON.stringify(e.target.value))
      setItemNumber(JSON.parse(localStorage.getItem('itemNumber')));
    } else { alert("you cant edit") }
  }
  function handleChange(event) {
    console.log(event.target.value, "kkkkkk");
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));

  }

  let getList = async () => {
    if (JSON.parse(localStorage.getItem('List'))) {
      setList(JSON.parse(localStorage.getItem('List')))
    }
    return () => {
      let localList = JSON.parse(localStorage.getItem('List'))

      setList(localList);
    }
  }// eslint-disable-line react-hooks/exhaustive-deps
  let getItemNum = async () => {
    if (JSON.parse(localStorage.getItem('itemNumber'))) {
      setItemNumber(Number(JSON.parse(localStorage.getItem('itemNumber'))))
    }
    return () => {
      let localList = Number(JSON.parse(localStorage.getItem('itemNumber')))

      setItemNumber(localList);
    }
  }
  useEffect(() => {

    getItemNum().then(() => { console.log("done") })

    getList().then(() => { console.log("done") })


  }, [])
  function displayComplete() {
    if (user.capabilities.includes('update')) {
      if (done === list)
        setDone(() => done.filter((item) => item.complete !== true));
      else setDone(list);

      done === list ? setA('off') : setA('on')
    } else { alert("you cant update") }
  }

  function toggleComplete(id) {

    if (user.capabilities.includes('update')) {
      const items = list.map((item) => {
        if (item.id === id) {

          item.complete = !item.complete;
        }
        return item;
      });
      localStorage.setItem('List', JSON.stringify(items))
      let c = JSON.parse(localStorage.getItem('List'))
      setList(c);

    } else { alert("you cant update") }
  }


  function deleteItem(id) {
    if (user.capabilities.includes('delete')) {
      const items = JSON.parse(localStorage.getItem('List')).filter(item => item.id !== id);

      localStorage.setItem('List', JSON.stringify(items))
      let c = JSON.parse(localStorage.getItem('List'))
      setList(c);
    } else { alert("you cant delete") }
  }

  return <ListContext.Provider value={{ list, handleSubmit, handleChange, toggleComplete, handlePaginationChange, a, setA, deleteItem, itemNumber, setItemNumber, setList, displayComplete, done, setDone }}>{props.children}</ListContext.Provider>;
}

export default List;