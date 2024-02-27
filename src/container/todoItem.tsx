import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo } from "./todoSlice"

const TodoItem: React.FC<{ id: string; title: string; completed: boolean }> = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(id));
    };

    return (
        <div>
            <div className="border-2 border-amber-50 w-40 h-10 text-center rounded-md mt-10 flex justify-between items-center">
                <p className="ml-5">{title}</p>
                <input type="checkbox" checked={completed} onChange={handleToggle} className="mr-5" />
            </div>
        </div>
    );
};

export default TodoItem;
