import React, { useState } from "react";
let numtodo = 0;


function TodosComponent() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      todo: "bake a cake",
      isCompleted: true
    },
    {
      todo: "go for a walk",
      isCompleted: false
    },
    {
      todo: "contribute a web development tutorial on Enlight",
      isCompleted: false
    }
  ]);

  function createNewTodo(currentTodo) {
      let todosArray = [...todos];
      todosArray.push({
          todo: currentTodo,
          isCompleted: false
      });
      setTodos(todosArray);
  }

  function completeTodo(index) {
    const todosArray = [...todos];
    todosArray[index].isCompleted = !todosArray[index].isCompleted;
    setTodos(todosArray);
  }

  function deleteTodo(index) {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
  }

  function todoSaver(){
    if(typeof(Storage) !== "undefined"){
      let todosArray = [...todos];
      localStorage.setItem(numtodo, currentTodo)
      localStorage.setItem("isCompleted", false);
      numtodo = numtodo + 1;
    }
  }
  

  return (
    <div>
      <input
        className="todo-input"
        value={currentTodo}
        onChange={e => {
            setCurrentTodo(e.target.value);
        }}
        
        onKeyPress={e => {
            if (e.key === "Enter") {
                createNewTodo(currentTodo);
                todoSaver(currentTodo);
                numtodo = numtodo + 1;
                setCurrentTodo("");
            }
        }}
      placeholder="What needs to get done?"
    />
     {todos.map((todo,index) => (
        <div key={todo} className="todo">
          <div className="checkbox" onClick={() => completeTodo(index)}>
           {todo.isCompleted && <span>&#x2714;</span>}
          </div>
          <div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
          <div className="delete" onClick={() => deleteTodo(index)}>
            &#128465;
          </div>
        </div>
      ))}
      {todos.length > 0 && `${todos.length} items`}
    </div>
  );
}
export default TodosComponent;
