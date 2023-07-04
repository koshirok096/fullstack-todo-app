import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from './store'; // Assuming you have an AppThunk type defined in your store

import axios from 'axios';

const API_URL = 'http://localhost:8000';

interface Todo {
  _id: string;
  data: string;
  completed: boolean;
  pinned: boolean;
  status: string;
  estimatedTime: number;
}

type TodosState = Todo[];

const initialState: TodosState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Todo>) => {
      state.unshift(action.payload);
    },
    setAllTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    toggleTodo: (state, action: PayloadAction<{ _id: string }>) => {
      const todo = state.find((t) => t._id === action.payload._id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<{ _id: string; data: string }>) => {
      const todo = state.find((t) => t._id === action.payload._id);
      if (todo) {
        todo.data = action.payload.data;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ _id: string }>) => {
      return state.filter((t) => t._id !== action.payload._id);
    },
    
    logoutAndClearTask: (state) => {
      // state._id = null;
      // state.data = null;
      // state.done = null;
      return []; // タスクをすべてクリアして空の配列を返す
    },
    toggleTaskPinned: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.find((t) => t._id === taskId);
      if (task) {
        task.pinned = !task.pinned;
      }
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.find((t) => t._id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, setAllTodos, toggleTodo, updateTodo, deleteTodo, logoutAndClearTask, toggleTaskPinned, toggleTaskCompleted } = todoSlice.actions;

export const fetchAllTodos = () => async (dispatch: any) => {
  try {
    const res = await axios.get<Todo[]>(`${API_URL}/todos`);
    dispatch(setAllTodos(res.data));
  } catch (error: any) {
    console.log('Error while calling fetchAllTodos API ', error.message);
  }
};

export const saveTodo = (data: { data: string }) => async (dispatch: any) => {
  try {
    const res = await axios.post<Todo>(`${API_URL}/todos`, { data });
    dispatch(addTask(res.data));
  } catch (error: any) {
    console.log('Error while calling saveTodo API ', error.message);
  }
};

export const toggleTodoStatus = (id: string) => async (dispatch: any) => {
  try {
    const res = await axios.get<Todo>(`${API_URL}/todos/${id}`);
    dispatch(toggleTodo(res.data));
  } catch (error: any) {
    console.log('Error while calling toggleTodoStatus API ', error.message);
  }
};

export const updateTodoData = (id: string, data: { data: string }) => async (dispatch: any) => {
  try {
    const res = await axios.put<Todo>(`${API_URL}/todos/${id}`, { data });
    dispatch(updateTodo(res.data));
  } catch (error: any) {
    console.log('Error while calling updateTodoData API ', error.message);
  }
  return {
    type: 'UPDATE_TODO',
    payload: { id, data },
  };
};

export const deleteTodoItem = (id: string) => async (dispatch: any) => {
  try {
    const res = await axios.delete<Todo>(`${API_URL}/todos/${id}`);
    dispatch(deleteTodo(res.data));
  } catch (error: any) {
    console.log('Error while calling deleteTodoItem API ', error.message);
  }
};

export default todoSlice.reducer;
