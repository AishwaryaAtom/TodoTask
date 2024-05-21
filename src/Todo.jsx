import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (id, status) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    if (taskName.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        taskName,
        description,
        status: "notCompleted",
      };
      setTodos([...todos, newTodo]);
      setTaskName("");
      setDescription("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditingId(id);
      setEditingTaskName(todo.taskName);
      setEditingDescription(todo.description);
    }
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId
        ? {
            ...todo,
            taskName: editingTaskName,
            description: editingDescription,
          }
        : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingTaskName("");
    setEditingDescription("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "all") {
      return true;
    } else {
      return todo.status === statusFilter;
    }
  });

  return (
    <div>
      <h1>Todo App</h1>
      <div className="filter">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      <div className="add-todo d-flex align-items-center justify-content-between">
        <div className="me-3">
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
            required
          />
        </div>
        <div className="me-3">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></input>
        </div>
        <button onClick={handleAddTodo} className="add-btn">
          Add Todo
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.map(
          (todo) =>
            editingId == null && (
              <div className="todo-card " key={todo.id}>
                <div>
                <h4 className="text-center">TODO</h4>
                <h6>Name: {todo.taskName}</h6>
                <p>Description: {todo.description}</p>
                <p>Status: {todo.status}</p>

                <div className="todo-actions d-flex justify-content-between">
                  <button
                      onClick={() => handleStatusChange(todo.id, "completed")}
                      className="add-btn me-2"
                  >
                    Mark as Completed
                  </button>

                    <button onClick={() => handleEditTodo(todo.id)} className="edit-btn me-2">Edit</button>

                  <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
                    Delete
                  </button>
                  </div>
                  </div>
              </div>
            )
        )}
      </div>

      {editingId && (
        <div className="edit-todo todo-card" >
          <h3>Edit Todo</h3>
          <div>
            <label htmlFor="editingTaskName">Task Name:</label>
            <input
              type="text"
              id="editingTaskName"
              value={editingTaskName}
              onChange={(event) => setEditingTaskName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="editingDescription">Description:</label>
            <input
              id="editingDescription"
              value={editingDescription}
              onChange={(event) => setEditingDescription(event.target.value)}
            ></input>
          </div>
          <button onClick={handleSaveEdit} className="add-btn me-3">
            Save
          </button>
          <button onClick={() => setEditingId(null)} className="delete-btn">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
