const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const todos  = [];
let currentId = 1;

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    const newTodo = {
        id: currentId++,
        task,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index > -1) {
        todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
