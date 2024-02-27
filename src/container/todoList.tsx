import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../App/Store';
import { addTodo, fetchTodos } from './todoSlice';
import TodoItem, {useDispatch} from "./todoItem";

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos()).then(() => setLoaded(true));
    }, [dispatch]);

    const todos = useSelector((state: RootState) => state.todos.todos);

    const handleAddTodo = () => {
        if (!inputValue.trim()) return;
        dispatch(addTodo(inputValue)).then(() => {
            dispatch(fetchTodos());
            setInputValue('');
        });
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo();
    };

    return (
        <div className="bg-emerald-800 h-20">
            <form onSubmit={handleSubmit}>
                <div className="text-2xl">
                    <input
                        className="ml-5 mt-7 rounded-md bg-emerald-50 text-black hover:border-black"
                        placeholder="add todos:"
                        value={inputValue}
                        onChange={handleChangeInput}
                    />
                    <button
                        type="submit"
                        className="ml-4 border bg-emerald-50 text-emerald-700 w-20 hover:bg-emerald-100"
                    >
                        add
                    </button>
                </div>
            </form>
            {loaded && (
                <ul>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} {...todo} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
