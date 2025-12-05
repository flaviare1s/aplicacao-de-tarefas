/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    saveTasks([...tasks, newTask]);
    toast.success('Tarefa adicionada com sucesso');
  };

  const removeTask = (taskId) => {
    saveTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Tarefa removida');
  };

  const editTask = (updatedTask) => {
    saveTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast.success('Tarefa atualizada');
  };

  const toggleTask = (taskId) => {
    saveTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      removeTask,
      editTask,
      toggleTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

