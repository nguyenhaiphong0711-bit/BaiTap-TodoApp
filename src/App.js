import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd() {
    if (!input.trim()) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      content: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function handleToggle(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  }

  function handleClearComplete() {
    const newTodos = todos.filter((todo) => !todo.completed);

    setTodos(newTodos);
  }

  let filteredTodos = todos;

  if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (filter === "complete") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <div className="todo">
      <h1>Todo App</h1>

      <div className="inner-create">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add details"
        />

        <button onClick={handleAdd}>Thêm</button>
      </div>

      <div className="inner-filter">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "complete" ? "active" : ""}
          onClick={() => setFilter("complete")}
        >
          Complete
        </button>
      </div>

      <div className="inner-list">
        {filteredTodos.map((todo) => (
          <div className="inner-item" key={todo.id}>
            <div className="inner-left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />

              <span className={todo.completed ? "completed" : ""}>
                {todo.content}
              </span>
            </div>

            <button
              className="btn-delete-icon"
              onClick={() => handleDelete(todo.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {filter === "complete" && (
        <div className="inner-footer-completed">
          <button className="btn-delete-all" onClick={handleClearComplete}>
            Clear Complete
          </button>
        </div>
      )}
    </div>
  );
}