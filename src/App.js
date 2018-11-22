import React, { Component } from 'react';
import './App.css';
import Category from './Conteiners/Category';
import TaskList from './Conteiners/TaskList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="category">
          <Category/>
        </div>
        <div className="content">
          <TaskList/>
        </div>
      </div>
    );
  }
}

export default App;
