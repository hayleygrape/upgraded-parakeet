const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())
const connection = mysql.createConnection({
    host: "localhost",
    user: "appUser",
    password: "s3cur3passw0rd5",
    database: 'my_db'
})

app.get("/snap/get-all", (req, res) => {
    const snaps = connection.query("select * from snaps", (err, rows, fields) => {
        if (err) throw err;
        res.send(JSON.stringify(rows))
    }) 
});

app.post("/snap/create", ({ body: { user, message } }, res) => {
    if (! user && ! message) throw new Error("error error!")
    const snaps = connection.query(`INSERT INTO snaps (user, message) VALUES ("${user}", "${message}")`,
    (err, rows, fields) => {
        if (err) throw err;
        res.send("success!")
    }) 
});



app.listen(3001, () =>
console.log("Listening on port 3001"),
);