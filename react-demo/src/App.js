import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'whatwg-fetch';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskData: [],
      showModal: false
    };
  }

  componentDidMount() {
    fetch('tasks.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({taskData: data})
      });
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {showModal: !prevState.showModal}
    })
  }

  toggleTaskCompleted = (taskId) => {
    this.setState((prevState) => {
      let updatedTasks = []
      for(let task of prevState.taskData){
        if(task.id === taskId){ //search
          task.complete = !task.complete;
        }
        updatedTasks.push(task)
      }
      let incompleteTasks = updatedTasks.filter((task) => !task.complete);

      return {taskData: updatedTasks, showModal: incompleteTasks.length == 0};
    })    
  }

  addTask = (description) => {

    this.setState((prevState) => {

      let newTask = {
        id: prevState.taskData.length + 1,
        description: description,
        complete: false
      }

      let updatedTasks = []
      for(let task of prevState.taskData){
        updatedTasks.push(task)
      }
      updatedTasks.push(newTask)

      return {taskData: updatedTasks}
    })


  }

  render() {

    let taskData = this.state.taskData; //local name for readability
    console.log("rendering with", taskData);

    //do data processing
    let incompleteTasks = taskData.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead" onClick={() => this.toggleTaskCompleted(1)}>I have to do {incompleteTasks.length} things today</p>
        <TaskList tasks={taskData} toggleFunction={this.toggleTaskCompleted} />
        <AddTaskForm howToAdd={this.addTask}  />

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>Congratulations!</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>        

      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.tasks.map((eachTask) => {
      let singleTask = (
        <Task key={eachTask.id} task={eachTask} whatToDoWhenClicked={this.props.toggleFunction} />
      )
      return singleTask;
    })

    return (
      <ol>
        {taskComponents}
      </ol>
    );
  }
}

class Task extends Component {
  //helper method
  getClassName() {
    if(this.props.task.complete){
      return 'font-strike';
    }
    return ''; //no className otherwise
  }

  toggleComplete = () => {
    console.log("toggle completeness of", this.props.task.description);

    //ask parent to change their state
    //App.toggleTaskCompleted(this.props.task.id)
    this.props.whatToDoWhenClicked(this.props.task.id)
  }

  render() {
    console.log("rendering a task");
    //console.log("The task: ", this.props.task);
    return (
      <li className={this.getClassName()} 
          onClick={ this.toggleComplete } >
            {this.props.task.description}
      </li>
    );
  }
}

class AddTaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {currentValue: ''};
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log("Adding", this.state.currentValue);
    this.props.howToAdd(this.state.currentValue);
    this.setState({currentValue: ''});
  }

  handleTyping = (event) => {
    let newValue = event.target.value;
    this.setState({currentValue: newValue});
  }

  render() {
    console.log(this.state.currentValue);
    return (
      <form>
        <input 
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          value={this.state.currentValue}
          onChange={this.handleTyping}
          />
        <Button color="primary" onClick={this.handleSubmit} >
          Add task to list
        </Button>
      </form>
    );
  }
}

export default App;