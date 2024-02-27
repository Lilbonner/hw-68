import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axiosApi.get('/todos.json');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const response = await axiosApi.post('/todos.json', { title, completed: false });
  return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id: string) => {
  const response = await axiosApi.patch(`/todos/${id}.json`, { completed: true });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await axiosApi.delete(`/todos/${id}.json`);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchTodos.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.status = 'idle';
          state.todos = Object.keys(action.payload).map((key) => ({
            id: key,
            ...action.payload[key],
          }));
        })
        .addCase(addTodo.fulfilled, (state, action) => {
          state.todos.push(action.payload);
        })
        .addCase(toggleTodo.fulfilled, (state, action) => {
          const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
          if (index !== -1) {
            state.todos[index].completed = true;
          }
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
          state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        });
  },
});

export default todoSlice.reducer;
