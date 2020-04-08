var fs = require("fs")
var path = require ("path")
var express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const db = ("./db/db.json")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    
        console.log(req.body)
        fs.readFile('/.db/db.json', "utf-8", function (err, data) {
        if (err) throw err
        return JSON.parse(data)
    })
    return res.json(db)
})

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    fs.readFile('/.db/db.json', 'utf-8', function (err, data) {
        if (err) throw err
        return JSON.parse(data)
    })
    return res.JSON(db)
})



app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params
    fs.readFile('/.db/db.json', 'utf-8', function (err, data) {
        if (err) throw err

        const notes = JSON.parse(data)
        notes.splice(id, 1)
        const string = JSON.stringify(notes)
        console.log(notes)
        fs.writefile('/.db/db.json', 'utf-8', string, function (err) {
            if (err) throw err
        })
    })
    return res.json(db)
});