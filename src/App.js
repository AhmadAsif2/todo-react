import React from 'react';
import './index.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

var FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const taskNoun = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${taskNoun} remaining`;

  const toggleTaskCompleted = (id) => {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(updateTasks);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(remainingTasks);
  };

  const editTask = (id, newTask) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newTask };
      }
      return task;
    });

    setTasks(editedTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const addTask = (name) => {
    const newTask = { id: nanoid(), name, completed: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="todoapp stack-large">
      <h1>My Todo App</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
