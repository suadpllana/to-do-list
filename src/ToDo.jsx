import React, { useState, useRef, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
const ToDo = () => {
  const [todos, setTodos] = useState(() => {
    const savedData = localStorage.getItem("myData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [activeItems, setActiveItems] = useState([]);
  const [inputRef, setInputRef] = useState("");

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(todos));
  }, [todos]);

  const newTask = useRef(null);

  function addTask() {
    if (!inputRef.trim()) return; 
    setTodos((prev) => [
      ...prev,
      {
        title: inputRef,
        id: Math.random(),
        isEditing: false,
        checked: false
      },
    ]);
   
    setInputRef("");
  }

  function deleteToDo(id) {
    const filteredToDos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredToDos);
  }

  function editToDo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  }

  function saveToDo(id , newTitle) {

    if(newTitle === ""){
      return
    }
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, isEditing: false } : todo
      )
    );
  }

  function toggleChecked(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }

  function enter(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }
  function saveTaskEnter(e , id){
    if(e.key === "Enter"){
      saveToDo(id , e.target.value)
    }
  }
  function moveTaskDown(index){
    if(index < todos.length - 1){
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1] , updatedTasks[index]];
setTodos(updatedTasks)
    }
  }
  function moveTaskUp(index){
    if(index > 0){
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1] , updatedTasks[index]];
setTodos(updatedTasks)
    }
  }


  return (
    <div>
      <div className="container">
        <h1>To-Do List App📕</h1>
        <input
          onKeyDown={(e) => enter(e)}
          type="text"
          placeholder="Write your tasks"
          value={inputRef}
          onChange={(e) => setInputRef(e.target.value)}
        />
        <button onClick={addTask}>Add task</button>
       
        {todos.map((todo ,index) => (
          <div key={todo.id} className="taskContainer">
            {todo.isEditing ? (
              
              <div className="cont">
              <input
                  type="text"
                  defaultValue={todo.title}
                 
                  placeholder="Edit task"
                  onBlur={(e) => saveToDo(todo.id , e.target.value)}
                  onKeyDown={(e) => saveTaskEnter(e , todo.id)}
                />
                <button onClick={(e) => saveToDo(todo.id, e.target.value)}>Save</button>
              </div>
             
              
            
            ) : (
              <p
                onClick={() => toggleChecked(todo.id)}
                className={todo.checked ? "checked" : ""}
              >
                {todo.title}
              </p>
            )}
            <div>
            <FaArrowUp  className="icon" onClick={() => moveTaskUp(index)}/>
            <FaArrowDown className="icon" onClick={() => moveTaskDown(index)}/>
              <CiTrash className="icon" onClick={() => deleteToDo(todo.id)} />
             
                <FaPen className="icon" onClick={() => editToDo(todo.id)} />
                
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
