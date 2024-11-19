import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../component-css/FirstPage.css'
import {Button} from 'react-bootstrap'
const FirstPage = () => {
  const [newTask, setNewTask] = useState('') 
  const [taskList, setTaskList] = useState([])

  const handleAddTask = (e) => {
    let tempList = [...taskList]
    tempList.push(e)
    setTaskList(tempList)   
    console.log("tempList : ",tempList);
  }

  const handleDeleteTask = (taskIndex) => {
    let tempList = [...taskList]
    for(let t in tempList){      
      if(parseInt(t) === taskIndex){
        tempList.splice(taskIndex,1);    
      }  
    }
    setTaskList(tempList)
  }
  
  useEffect(()=>{
    axios.get("http://localhost:5000/tasks")
    .then((res) => {
      console.log(res.data); 
      let tempList = [...taskList]
      for(let i in res.data){
        tempList.push(res.data[i].title)
      }
      setTaskList(tempList)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <>
      <div className='main-div'>
        <h1>TO DO LIST</h1>  
        <input 
                type='text' 
                placeholder='Enter the task'
                onChange={(e)=> {
                  setNewTask(e.target.value)
                }}/>
          <Button variant='primary' onClick={() => handleAddTask(newTask)}>ADD</Button>
  
          <table>
            <thead>
            <tr>
              <th>{"  "}</th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {taskList.map((task,index)=>{
            return(
              <>
                <tr key={index}>
                  <td><input type='checkbox'/></td>
                  <td>{task}</td>
                  <td><Button variant='primary' onClick={() => handleDeleteTask(index)}>Delete</Button></td>
                </tr>
              </>
              )
            })}
            </tbody>
          </table>
      </div>
    </>
  )
}

export default FirstPage