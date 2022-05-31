const express =require("express");
const bodyParser= require('body-parser');
const app = express();
const mysql = require('mysql');
const cors =  require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudmuseu",
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get',(req,res)=>{
    const SQL = "SELECT * FROM museus";
    db.query(SQL,(err,result)=>{
        res.send(result)
        
    });
});

app.post('/api/insert',(req, res) =>{

    const museuName = req.body.museuName;
    const museuReview = req.body.museuReview;
    

    let sqlInsert = "INSERT INTO museus (museuName, museuReview) VALUES(?,?)";
    db.query(sqlInsert, [museuName,museuReview],(err,result)=>{
        console.log(err);
        
    });
});




app.listen(3001, () => {
    console.log("Server Running")
});

app.delete('/api/delete/:museuName', (req,res)=>{
    const name = req.params.museuName
    const sqlDelete = "DELETE FROM museus WHERE museuName = ?";
    db.query(sqlDelete, name, (err,result)=>{
        if(err) console.log(err)
    });
});


app.put('/api/update', (req,res)=>{
    const name = req.body.museuName;
    const review = req.body.review;
    const sqlUpdate = "UPDATE  museus SET museuReview = ? WHERE museuName =? ";
    db.query(sqlUpdate, [review,name], (err,result)=>{
        if(err) console.log(err)
    });
});