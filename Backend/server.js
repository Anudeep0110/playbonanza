const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const db = require('./connexion')
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())

// Database Schema Import Statements
const db_users = require('./Databases/Users')


app.post('/signup',async (req,res) => {
    const uname = req.body.uname
    const fname = req.body.fname
    const email = req.body.email
    const pwd = req.body.pwd
    await db_users.insertMany({
        username : uname,
        password : pwd,
        fullname : fname,
        email : email,
        avatar:"av1.jpg",
        played : "anudeep",
        wins : 0,
        loses : 0,
        coins : 0,
        vouchers : [],

    }).then(() => {
        res.send({flag:true});
    })
    .catch(() => {
        res.send({flag:false});
    })
})

app.post('/login',async (req,res) => {
    const uname = req.body.uname;
    const pwd = req.body.pwd;
    await db_users.find({username:uname,password:pwd},{username:1,password:1})
    .then(response => {
        if(response.length>0 && response.length===1) res.send({flag:true})
        else res.send({flag:false})
    })
    .catch(() => {
        res.send({flag:false})
    })
})


app.post('/checkusername',(req,res) => {
    const user = req.body.uname
    db_users.find({username:user})
    .then(response => {
        if(response.length>0) res.send({flag:false})
        else res.send({flag:true})
    })
})


app.post('/profile',(req,res) => {
    const uname = req.body.uname;
    db_users.find({username:uname})
    .then(response => {
        res.send({data:response[0]})
    })
})


app.post('/casino',(req,res) => {
    const uname = req.body.uname
    const win = req.body.win
    const type = req.body.type;
    if(type === "vouchers"){
        db_users.findOneAndUpdate({username:uname},{$push:{vouchers:win}},{new:true,writeConcern: { w: 'majority' }})
        .then(response => {
            console.log(response);
        })        
    }else if(type==="coins"){
        db_users.findOneAndUpdate({username:uname},{$inc:{coins:win}},{new:true,writeConcern: { w: 'majority' }})
        .then(response => {
            console.log(response);
        })
    }
        res.send({flag:true})
})









app.listen(8888,() => {
    console.log("Listening on 8888");
})

