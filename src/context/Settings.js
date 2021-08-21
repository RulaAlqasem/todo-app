import axios from 'axios';
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
  const { user } = useContext(AuthContext);


  let API_TO = 'https://api-js401.herokuapp.com/api/v1/todo'


  async function handleSubmit(event) {

    if (user.capabilities.includes('create')) {
      if (event) event.preventDefault();
      values.id = uuid();
      values.complete = false;

      console.log(values);
      let item1 = [...list, values]
      let item = {
        "complete": values.complete,
        "difficulty": values.difficulty,
        "id": values.id,
        "text": values.text,
        "assignee": values.assignee,
      }

        ; let a = await axios.post(API_TO, item)
      let c = (await axios.get(API_TO)).data.results
      console.log(c);
      setList(c);
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
    let c = (await axios.get(API_TO)).data.results
    setList(c);
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



  useEffect(async () => {

    getItemNum().then(() => { console.log("done") })

    getList().then(() => { console.log("done") })
    let c = (await axios.get(API_TO)).data.results
    setList(c);


  }, [])
  function displayComplete() {
    if (user.capabilities.includes('update')) {
      if (done === list)
        setDone(() => done.filter((item) => item.complete !== true));
      else setDone(list);

      done === list ? setA('off') : setA('on')
    } else { alert("you cant update") }
  }

  async function toggleComplete(item) {

    if (user.capabilities.includes('update')) {

      item.complete = !item.complete;
      let l = {
        "complete": item.complete
      }
      let a = await axios.put(`${API_TO}/${item._id}`, l)
      let c = (await axios.get(API_TO)).data.results
      setList(c);


    } else { alert("you cant update") }
  }


  async function deleteItem(_id) {
    if (user.capabilities.includes('delete')) {
      let a = await axios.delete(`${API_TO}/${_id}`)
      console.log(a);
      let c = (await axios.get(API_TO)).data.results
      console.log(c);
      setList(c);
    } else { alert("you cant delete") }
  }

  return <ListContext.Provider value={{ list, handleSubmit, handleChange, toggleComplete, handlePaginationChange, a, setA, deleteItem, itemNumber, setItemNumber, setList, displayComplete, done, setDone }}>{props.children}</ListContext.Provider>;
}

export default List;