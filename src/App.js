import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config3'
import TodoList from './TodoList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true
    };

    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);  // Bind deleteTask here
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });

    const taskCount = await todoList.methods.taskCount().call();
    this.setState({ taskCount });

    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      this.setState({
        tasks: [...this.state.tasks, task]
      });
    }
    this.setState({ loading: false });
  }

  createTask(content) {
    const newTask = {
      id: Number(this.state.taskCount) + 1,
      content: content,
      completed: false,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      taskCount: Number(this.state.taskCount) + 1,
    });

    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
      .once('receipt', async (receipt) => {
        const taskCount = await this.state.todoList.methods.taskCount().call();
        this.setState({ taskCount: Number(taskCount) });

        const tasks = [];
        for (var i = 1; i <= Number(taskCount); i++) {
          const task = await this.state.todoList.methods.tasks(i).call();
          tasks.push(task);
        }

        this.setState({ tasks });
      });
  }

  deleteTask(taskId) {
    this.setState({ loading: true });
  
    this.state.todoList.methods.deleteTask(taskId).send({ from: this.state.account })
      .once('receipt', async (receipt) => {
        // Remove the deleted task from the state
        const remainingTasks = this.state.tasks.filter(task => task.id !== taskId);
  
        this.setState({
          tasks: remainingTasks,
          loading: false
        });
      });
  }
  

  toggleCompleted(taskId) {
    this.setState({ loading: true });
    this.state.todoList.methods.toggleCompleted(taskId).send({ from: this.state.account })
      .once('receipt', async (receipt) => {
        const updatedTask = await this.state.todoList.methods.tasks(taskId).call();

        const updatedTasks = this.state.tasks.map(task =>
          task.id === taskId ? updatedTask : task
        );

        this.setState({
          tasks: updatedTasks,
          loading: false
        });
      });
  }
  

  render() {
  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark shadow">
        <p className="navbar-brand mx-auto" > 
          Todo List
        </p>
      </nav>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="todo-container p-4 bg-white rounded shadow-sm">
          {this.state.loading ? (
            <div id="loader" className="text-center">
              <p>Loading...</p>
            </div>
          ) : (
            <TodoList
              tasks={this.state.tasks}
              createTask={this.createTask}
              toggleCompleted={this.toggleCompleted}
              deleteTask={this.deleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}
}

export default App;
