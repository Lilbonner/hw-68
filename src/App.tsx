import './App.css';
import TodoList from './container/todoList';
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
      </div>
    </>
  );
}

export default App;
