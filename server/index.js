const express =require("express");
const app = express();
const mysql = require('mysql');
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudmuseu",
});

app.get('/',(req, res) =>{

    let SQL = "INSERT INTO museus (name, museuReview) VALUES('troncos e raizes', 'museu indigena');";
    db.query(SQL,(err,result)=>{

        res.send("OPPPA");
        console.log(err);
        
    })
});



app.listen(3001, () => {
    console.log("Server Running")
});