const express= require('express')
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const multer=require('multer');
require('./db/conn')
const router=require('./routes/router')

app.use(cors());
app.use(express.json());
app.use(router)
app.use("/upload",express.static("./upload"))
const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Shiva@123",
    database:"employess",
});
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  }); 

 
  
   app.post('/signincreate',(req,res)=>
   {
    const username=req.body.username;
    const password=req.body.password;
    const phone=req.body.phone;
    const email=req.body.email;
    const usertype=req.body.usertype;

    db.query("INSERT INTO signup (username,password,phone,email,usertype) VALUES(?,?,?,?,?)",
    [username,password,phone,email,usertype],(err,result)=>
    {
        if(err)
        {
            console.error(err);
        }
        res.send("succesfully inserted")
    })
   })
// display the value
// app.get('/employee',(req,res)=>
// {
//     db.query("SELECT * FROM employee",(err,result)=>
//     {
//         if(err)
//         {
//             console.error(err);
//         }
//         res.send(result)
//     })
// })
// update the value
// app.put("/update",(req,res)=>
// {
//     const id=req.body.id;
//     const name=req.body.name;
//     db.query("UPDATE employee SET name= ? WHERE id= ?",[name,id],(err,result)=>
//     {
        
//         if(err)
//         {
//             console.error(err);
//         }
//         res.send(result);
        
//     })
// })

// app.delete('/delete/:id',(req,res)=>
// {
//     const id=req.params.id
//     db.query("DELETE FROM employee WHERE id=?",id,(err,result)=>
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         res.send(result);
//     })
    
// })
// login in 
app.post('/logincreate',async(req,res)=>
{

 const username=req.body.username;
 const password=req.body.password;
 const usertype=req.body.usertype;
 db.query("INSERT INTO sign (username,password,usertype) VALUES(?,?,?)",
 [username,password,usertype],(err,result)=>
 {
    if(err)
    {
        console.error(err);
    }
    res.send("succesfully inserted int sign")
 })
})

app.post('/Login',(req,res)=>{
    const sql="SELECT * FROM sign WHERE username=? AND password=? AND usertype=?"
    db.query(sql,[req.body.username,req.body.password,req.body.usertype],(err,data)=>{
        if(err){
            return res.json(err);
        }
        if(data.length >0){
             return res.json("Success")
        }
        else{
            return res.json("Failed")
            console.log(req.body.usernamem)
        }
    })
})

app.get('/logindiaplay',(req,res)=>
{
    db.query("SELECT * FROM sign",(err,result)=>
    {
        if(err)
        {
            console.error(err);
        }
        res.send(result)

    })
})

app.listen(3001,(error,data)=>
{
    if(error)
    {
        console.error(error);
    }
    console.log("yahh running 30001");

});
// if this error comes again

// code: 'ER_NOT_SUPPORTED_AUTH_MODE',
// errno: 1251,
// sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
// sqlState: '08004',
// fatal: true
// this means connection error

// solution
// alter user 'root'@'localhost' identified with mysql_native_password by 'Shiva@123';