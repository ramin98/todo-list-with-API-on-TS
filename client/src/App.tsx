import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const response = await axios.post('http://localhost:5000/api/todos', { task });
        setTodos([...todos, response.data]);
        setTask('');
    };

    const deleteTodo = async (id: number) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.task} <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
