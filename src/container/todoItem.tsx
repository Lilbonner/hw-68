import React from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from '../App/Store';
import { deleteTodo, toggleTodo } from "./todoSlice"

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
}

export const useDispatch = () => useReduxDispatch<AppDispatch>();

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = () => {
        dispatch(deleteTodo(id));
    };

    return (
        <div>
            <div className={`border-2 border-amber-50 w-72 h-20 text-center rounded-md mt-10 flex bg-gray-300 text-black justify-between items-center ${completed ? 'bg-gray-500 text-emerald-300' : ''}`}>
                <p className="ml-5">{title}</p>
                <div className='flex'>
                    <input type="checkbox" checked={completed} onChange={handleToggle} className="mr-4" />
                    <button onClick={handleDelete} className='material-symbols-outlined'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
