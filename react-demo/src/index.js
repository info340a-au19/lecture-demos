import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'; //include our css (bundled)
import App from './App';

const SAMPLE_TASKS = [
  {id:1, description:'Learn JSX', complete:true},
  {id:2, description:'Learn about React State', complete:false},
  {id:3, description:'Get some sleep', complete:false} 
];

//render App, passing it array as prop!
ReactDOM.render(<App initialTasks={SAMPLE_TASKS} />, document.getElementById('root'));