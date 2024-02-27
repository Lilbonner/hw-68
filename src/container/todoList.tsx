import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/Store';
import { fetchTodos } from './todoSlice';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
      <div className="bg-emerald-800 h-20">
        <div className="text-2xl">
          <input className="ml-5 mt-7 rounded-md bg-emerald-50 text-black hover:border-black" placeholder="add todos:" />
          <button className="ml-4 border bg-emerald-50 text-emerald-700 w-20 hover:bg-emerald-100">add</button>
        </div>
        <ul>
          {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default TodoList;
