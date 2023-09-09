import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [
    { id: 1, description: "task 1" },
    { id: 2, description: "task 2" }
];


app.get("/", (req, res) => {
    res.render("index.ejs", { tasks: tasks });
});

app.post("/addTask", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.description
    };
    tasks.push(newTask);
    res.redirect("/");
});

app.post('/delete/:id', (req, res) => {
    const idToRemove = parseInt(req.params.id);
    let indexToRemove = tasks.findIndex(task => task.id === idToRemove)
    tasks.splice(indexToRemove, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

