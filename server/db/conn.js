// const mysql=require('mysql');
const mysql=require('mysql');
const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Shiva@123",
    database:"employess",
})

conn.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database img');
  }); 

  module.exports=conn;