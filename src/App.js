import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true,
    };

    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    // Use MetaMask's provider instead of Infura for transactions
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
      this.setState({ todoList });

      const taskCount = await todoList.methods.taskCount().call();
      this.setState({ taskCount });

      const tasks = [];
      for (let i = 1; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call();
        tasks.push(task);
      }
      this.setState({ tasks, loading: false });
    } else {
      alert('MetaMask is not installed. Please install it to interact with this app.');
    }
  }

  async createTask(content) {
    try {
      this.setState({ loading: true });
      const receipt = await this.state.todoList.methods.createTask(content).send({
        from: this.state.account,
      });

      const taskCount = await this.state.todoList.methods.taskCount().call();
      const tasks = [];
      for (let i = 1; i <= taskCount; i++) {
        const task = await this.state.todoList.methods.tasks(i).call();
        tasks.push(task);
      }

      this.setState({ tasks, taskCount, loading: false });
    } catch (error) {
      console.error("Error creating task:", error);
      this.setState({ loading: false });
    }
  }

  async deleteTask(taskId) {
    try {
      this.setState({ loading: true });
      await this.state.todoList.methods.deleteTask(taskId).send({
        from: this.state.account,
      });
      const remainingTasks = this.state.tasks.filter(task => task.id !== taskId);
      this.setState({ tasks: remainingTasks, loading: false });
    } catch (error) {
      console.error("Error deleting task:", error);
      this.setState({ loading: false });
    }
  }

  async toggleCompleted(taskId) {
    try {
      this.setState({ loading: true });
      await this.state.todoList.methods.toggleCompleted(taskId).send({
        from: this.state.account,
      });
      const updatedTask = await this.state.todoList.methods.tasks(taskId).call();
      const updatedTasks = this.state.tasks.map(task =>
        task.id === taskId ? updatedTask : task
      );

      this.setState({ tasks: updatedTasks, loading: false });
    } catch (error) {
      console.error("Error toggling task:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark shadow">
          <p className="navbar-brand mx-auto">Todo List</p>
          <p className='address'>{TODO_LIST_ADDRESS}</p>
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
