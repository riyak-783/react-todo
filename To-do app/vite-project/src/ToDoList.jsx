import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      if (isEditing) {
        const updatedTasks = tasks.map((task, index) => 
          index === currentTaskIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks(t => [...t, newTask]);
      }
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  }

  return (
    <div className='max-w-md mx-auto mt-20  p-6 bg-[#90e0ef] rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold font-mono mb-4'>To-Do List</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter a task'
          value={newTask}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded mb-2'
        />
        <button
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300'
          onClick={addTask}
        >
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>

      <ol className='list-decimal list-inside'>
        {tasks.map((task, index) =>
          <li key={index} className='flex justify-between items-center font-semibold p-2 border-b border-gray-200'>
            <span className='text-gray-700'>{task}</span>
            <div>
              <button
                className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 mr-2'
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300'
                onClick={() => editTask(index)}
              >
                Edit
              </button>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}

export default ToDoList;
