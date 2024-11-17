import React, { useState } from 'react'
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
            <tr>
              <th>{"  "}</th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
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
          </table>
      </div>
    </>
  )
}

export default FirstPage