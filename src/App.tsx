import './App.css';
import TodoList from './container/todoList';
import TodoItem from './container/todoItem';
import {fetchTodos} from './container/todoSlice';
import {useEffect} from 'react';
import store from './App/Store';

function App() {

  useEffect(() => {
    store.dispatch(fetchTodos());
  }, []);

  return (
    <>
      <div>
      <TodoList/>
      <TodoItem/>
      </div>
    </>
  );
}

export default App;
