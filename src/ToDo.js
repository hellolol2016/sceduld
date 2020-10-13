import React, { useState, useEffect} from "react";


function TodosComponent() {
  //declares new state variables by using useState
  const [currentTodo, setCurrentTodo] = useState("");
  //updates state var
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoList = localStorage.getItem('todoList');
    console.log(todoList);
    const todoData = JSON.parse(todoList);
    setTodos(todoData);
    //[] makes it so useEffect only activates once after reloading
  }, [] );

  //function that creates new todos and pushes to the list
  function createNewTodo(currentTodo) {
    if (todos != null) {
      let todosArray = [...todos];
      //pushes new objects with boolean var isCompleted
      todosArray.push({
          todo: currentTodo,
          isCompleted: false
      });
      const todosArrayData = JSON.stringify(todosArray);
      localStorage.setItem('todoList', todosArrayData);

      //update todos array by setTodos
      setTodos(todosArray);
    }   else {
      let firstTodo = [{
        todo: currentTodo,
        isCompleted: false
      }];
      setTodos(firstTodo);
      localStorage.setItem('todoList', JSON.stringify(firstTodo));
    }
  };

  function completeTodo(index) {
    //makes copy of todos array using ellipses???
    const todosArray = [...todos];
    //set isCompleted var oppositite with !
    todosArray[index].isCompleted = !todosArray[index].isCompleted;
    //update todos
    setTodos(todosArray);
  };

  function deleteTodo(index) {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);

    const todosArrayData = JSON.stringify(todosArray);
    localStorage.setItem('todoList', todosArrayData);
  };
  

  return (
    <div>

      <input
        className="todo-input"
        value={currentTodo}
        //when input box is changed, set current todo value to the values inputted
        onChange={e => {
            setCurrentTodo(e.target.value);
        }}
        
        onKeyPress={e => {
            if (e.key === "Enter") {
                createNewTodo(currentTodo);
                setCurrentTodo("");
            }
        }}
      placeholder="What needs to get done?"
    />
    {
      todos && todos !== undefined && todos.map((todo,index) => (
        <div key = {todo} className = "todo">
          <div className = "checkbox" onClick = {() => completeTodo(index)}>
            {todo.isCompleted && <span><img alt = "checkmark" src="https://img.icons8.com/cotton/30/000000/successfully-completed-task--v1.png"/></span>}
          </div>
          <div className = {todo.isCompleted ? "done" : ""}>
            {todo.todo}
          </div>
          <div className = "delete" onClick = {() => deleteTodo(index)}>
            <div>&#128465;</div>
          </div>
        </div>
      ))
    }
    </div>
  );
}
export default TodosComponent;
