import { Task } from "./types/tasks";

const baseUrl = 'http://localhost:3001';

// Get all todos
export const getTodos = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await response.json();
  return todos;
};

// Add a new todo
export const addTodo = async (task: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  const newTodo = await response.json();
  return newTodo;
};

// Edit an existing todo
export const editTodo = async (task: Task): Promise<Task> => {
  const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const updatedTodo = await response.json();
  return updatedTodo;
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

};
