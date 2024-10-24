import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
  render() {
    return (
      <div id="content">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.props.createTask(this.task.value);
          }}
        >
          <input
            id="newTask"
            ref={(input) => {
              this.task = input;
            }}
            type="text"
            className="form-control mb-3"
            placeholder="Add New"
            required
          />
          <input type="submit" hidden />
        </form>
        <ul id="taskList" className="list-group mb-3">
          {this.props.tasks
            .filter(task => task.content.trim() !== '')  // Filter out tasks with empty content
            .map((task, key) => {
              return (
                <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <input
                      type="checkbox"
                      name={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => this.props.toggleCompleted(task.id)}
                    />{' '}
                    <span className={task.completed ? 'completed' : ''}>{task.content}</span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.deleteTask(task.id)}>
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
