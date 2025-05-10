import React from "react";

export default function TodoApp() {
  const listStyle =
  {
    listStyleType: "none"
  };
  const completeText =
  {
    color: "green",
    textDecoration: "line-through"
  };

  const [title, setTitle] = React.useState("")
  const [todos, setTodos] = React.useState([])

  const handleChange = e => {
    setTitle(e.target.value)
  }

  const addTodo = () =>
  {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: title,
        completed: false
      }
    ])
  }

  const onSubmit = e => {
    e.preventDefault()

    if (title === "")
      return

    addTodo()
    setTitle("")
  }

  const removeTodo = todoId =>
    {
      const updatedTodos =
        todos.filter(
          todo =>
            todo.id !== todoId
        )

      setTodos(updatedTodos)
    }

  const toggleTodo = todoId =>
    {
    const updatedTodos = todos.map(todo =>
    {
      return todo.id === todoId
        ?
          {
            ...todo,
            completed: !todo.completed
          }
        : todo
    })
    setTodos(updatedTodos)
  }

  return (
    <div className = "container">
      <form onSubmit = {onSubmit}>
        <label
          htmlFor = "todo"
        >
          React Todo
        </label>
        <br />
        <input
          id = "todo"
          className = "todo-input"
          onChange = {handleChange}
          value = {title}
        />
        <button
          type = "submit"
          className = "add-btn"
        >
          Add
        </button>
      </form>
      <div>
        <ul
          tyle = {listStyle}
        >
        {
          todos.map
          (
            todo =>
            (
              <li key = {todo.id}>
                <input
                  type = "checkbox"
                  value = {todo.completed}
                  onClick =
                  {
                    () => toggleTodo(todo.id)
                  }
                />

                <span
                  className =
                  {
                    todo.completed
                      ? "todo-completed"
                      : undefined
                  }
                  style =
                  {
                    todo.completed
                      ? completeText
                      : undefined
                  }
                >
                  {todo.text}
                </span>

                <button
                  className = "delete-btn"
                  onClick =
                  {
                    () => removeTodo(todo.id)
                  }
                >
                  X
                </button>
              </li>
            )
          )
        }
        </ul>
      </div>
    </div>
  )
}