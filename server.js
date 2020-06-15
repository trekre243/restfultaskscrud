const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restfultask', {useNewUrlParser: true});

app.use(express.static(__dirname + '/public/dist/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const TaskSchema = new mongoose.Schema({
    title: String,
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false}
}, {timestamps: true});

const Task = mongoose.model('Task', TaskSchema);

app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => {
            res.json({message: "success", data: tasks});
        })
        .catch(err => {
            res.json({message: "error", data: err});
        })
});

app.get('/tasks/:id', (req, res) => {
    Task.findOne({_id: req.params.id})
        .then(task => {
            res.json({message: "success", data: task});
        })
        .catch(err => {
            res.json({message: "error", data: err});
        });
});

app.post('/tasks', (req, res) => {
    Task.create(req.body)
        .then(resp => {
            res.json({message: "success", data: resp});
        })
        .catch(err => {
            res.json({message: "error", data: err});
        });
});

app.put('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(resp => {
            res.json({message: "success", data: resp});
        })
        .catch(err => {
            res.json({message: "error", data: err});
        });
});

app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({_id: req.params.id})
        .then(resp => {
            res.json({message: "success", data: resp});
        })
        .catch(err => {
            res.json({message: "error", data: err});
        });
})

app.listen(8000, () => console.log('Server started on port 8000'));