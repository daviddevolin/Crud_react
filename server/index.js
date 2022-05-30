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
    let SQL = "SELECT * FROM museus";
    db.query(SQL,(err,result)=>{
        res.send(result)
        
    });
})

app.post('/api/insert',(req, res) =>{

    const museuName = req.body.museuName;
    const museuReview = req.body.museuReview;
    

    let SQL = "INSERT INTO museus (museuName, museuReview) VALUES(?,?)";
    db.query(SQL, [museuName,museuReview],(err,result)=>{
        console.log(err);
        
    });
});




app.listen(3001, () => {
    console.log("Server Running")
});