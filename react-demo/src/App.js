import React, { Component } from 'react';

class App extends Component {

  render() {
    let taskData = this.props.initialTasks; //local name for readability

    //do data processing
    let incompleteTasks = taskData.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead">I have to do {incompleteTasks.length} things today</p>
        <TaskList tasks={taskData} />
        <AddTaskForm />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.tasks.map((eachTask) => {
      let singleTask = <Task key={eachTask.id} task={eachTask} />
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
  constructor(props){
    super(props);

    //this.state.complete = this.initialComplete
    this.state = {
      complete: this.props.task.complete,
      count: 0
    };
  }

  //helper method
  getClassName() {
    // if(this.props.task.complete){
    if(this.state.complete){
      return 'font-strike';
    }
    return ''; //no className otherwise
  }

  toggleComplete = () => {
    // console.log(this);
    //this.props.task.complete = !this.props.task.complete;
    console.log("toggle completeness of", this.props.task.description);
    //CHANGE THE STATE
    this.setState((currState) => {
        return {complete: !currState.complete}
      }   
    )
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
  render() {
    return (
      <form>
        <input 
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          />
        <button className="btn btn-primary" >
          Add task to list
        </button>
      </form>
    );
  }
}

export default App;