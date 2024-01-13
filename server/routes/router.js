const express=require("express");
const  router= new express.Router();
const conn=require('../db/conn')
const multer=require('multer');
router.use(express.json());
// const moment=require("moment");

// image storage config
var imgconfig=multer.diskStorage({
    destination:(req,file,callback)=>
    {
        callback(null,"./upload");
    },
    filename:(req,file,callback)=>
    {
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage=(req,file,callback)=>
{
    if(file.mimetype.startsWith("image"))
    {
        callback(null,true)
    }
    else{
        callback(null,Error("only image is allowed"))
    }

    
}
var upload=multer({
    storage:imgconfig,
    fileFilter:isImage
})
// register userdata single
// router.post("/register",upload.single("photo"),(req,res)=>
// {
//     const {name}=req.body;
//     const {filename}=req.file;
//     // const {filename1}=req.file;
//     console.log(name)
//     console.log(filename)
//     if(!name ||!filename )
//     {
//         res.status(422).json({status:422,message:"fill all the details"})
//     }
//     try{
//         // let date=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
//         conn.query("INSERT INTO image (name,image,imagea) VALUES(?,?,?)",[name,filename,filename],(error,result)=>
//         {
//             if(error)
//             {
//                 console.log(error);
//             }
//             else{
//                 console.log("data added");
//                 res.status(201).json({status:201,data:req.body})
//             }
//         })
//     }
//     catch(error){
//         res.status(422).json({status:422,error})

//     }
//     // console.log(req.body)
// })



// muliple image upload
router.post("/register",upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),(req,res)=>
{
    
    const files = req.files;
    const {name}=req.body;
    const {username}=req.body;
    const image1= files['image1'][0].filename;
    const image2 =files['image2'][0].filename;
    console.log(name)
    console.log(image1)
    console.log(image2)
    if(!name ||!image1||!image2 )
    {
        res.status(422).json({status:422,message:"fill all the details"})
    }
    try{
        // let date=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        conn.query("INSERT INTO image (name,image,imagea,username) VALUES(?,?,?,?)",[name,image1,image2,username],(error,result)=>
        {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log("data added");
                res.status(201).json({status:201,data:req.body})
            }
        })
    }
    catch(error){
        res.status(422).json({status:422,error})
    }

    // console.log(req.body)
})// GET USER DATA
router.get("/getdataa",(req,res)=>{
    try{
        conn.query("SELECT * FROM image ",(error,result)=>{
            if(error)
            {
                console.log(error);
            }
            else{
                console.log("data displayed");
                console.log(result)
                res.status(201).json({status:201,data:result})
            }
        })
    }
    catch(error)
    {
        res.status(422).json({status:422,error})  
    }
})
// give particular user 
router.get("/getdatahis", (req, res) => {
    try {
      const username = req.query.username; // Access the username from query parameters
  
      conn.query('SELECT * FROM history WHERE username = ?', username, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 500, error: 'Internal server error' });
        } else {
          console.log('Data displayed');
          res.status(201).json({ status: 201, data: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({ status: 422, error: 'Unprocessable entity' });
    }
  });


// delete
// await fspromise.unlink(path.join(__dirname,'upload','start.txt'))
router.delete('/delete/:id',(req,res)=>
{
    const id=req.params.id
    conn.query("DELETE FROM image WHERE idimage=?",id,(err,result)=>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(result);
        console.log("deleted"+"id is"+id)
    })
    
})


// update the user or edit the user details
router.put("/updatehotel", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]), (req, res) => {
    try {
      const id = req.body.id;
      const { name } = req.body;
      const files = req.files;
  
      // Log the files object structure to see its contents
      console.log('Files:', files);
      
      if (!files || !files['image1'] || !files['image2']) {
          console.log('Files:', files);
          throw new Error('Image files are missing or incorrectly named.');
        }
        
        const image1 = files['image1'][0].filename;
        const image2 = files['image2'][0].filename;
        
        conn.query("UPDATE image SET name=?, image=?, imagea=? WHERE idimage=?", [name, image1, image2, id], (err, result) => {
            if (err) {
                console.error(err);
                // console.log('Files:', files);
                console.log(id);
                console.log(name);
                
          res.status(500).send('Error updating image');
          return;
        }
        res.send(result);
      });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });

//   history of booking
  router.post("/his",(req,res)=>
{
    const person=req.body.person
    const day=req.body.days
    const fromdate=req.body.fromdate
    const lastdate=req.body.lastdate
    const room=req.body.room
    const noperson=req.body.noperson
    const username=req.body.username
    const hotelname=req.body.hotelname
    const image1=req.body.image1
    const ownername=req.body.ownername
    const status='true';
    const confortable="pending";
    conn.query("INSERT INTO history (countperson,fromdate,lastdate,stayname,countroom,username,hotelname,image1,totaldays,stauts,conformation,ownername) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[noperson,fromdate,lastdate,person,room,username,hotelname,image1,day,status,confortable,ownername],(error,result)=>
    {
        if(error)
        {
            console.log(error);
            console.log("ll"+""+noperson)
            console.log(ownername)
            console.log(fromdate)
            console.log(noperson)
            console.log(noperson)
        }
        else{
            console.log("data added");
            res.send("sucessfully inserted")
        }
    })

})
// GET USER DATA from History
router.get("/getdatahisdate",(req,res)=>{
  try{
      conn.query("SELECT * FROM history ",(error,result)=>{
          if(error)
          {
              console.log(error);
          }
          else{
              console.log("data displayed rooms data");
              res.status(201).json({status:201,data:result})
          }
      })
  }
  catch(error)
  {
      res.status(422).json({status:422,error})  
  }
})
// geting the data from image
router.get("/getdata", (req, res) => {
    try {
      const username = req.query.username; // Access the username from query parameters
  
      conn.query('SELECT * FROM image WHERE username = ?', username, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 500, error: 'Internal server error' });
        } else {
          console.log('Data displayed');
          res.status(201).json({ status: 201, data: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({ status: 422, error: 'Unprocessable entity' });
    }
  });
  // updating the history
  router.put("/updatehoteluser",  (req, res) => {
    try {
      const id = req.body.id;
      const name = req.body.stauts; 
      // console.log(id)
      // console.log("not geting");
      // console.log(name)
      if(id===""||name==="")
      {
        res.status(422).json({status:422,message:"fill all the details"})
      }
        conn.query("UPDATE history SET stauts=? WHERE idHistory=?", [name, id], (err, result) => {
            if (err) {
                console.error(err);
                console.log(id);
                console.log("not geting");
                console.log(name);
                
          res.status(500).send('Error updating image');
          return;
        }
        res.send(result);
      });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  // give particular user 
router.get("/getdatahisowner", (req, res) => {
  try {
    const username = req.query.username; // Access the username from query parameters
    console.log(username)
    conn.query('SELECT * FROM history WHERE ownername = ?',username, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: 'Internal server error' });
      } else {
        console.log('Data displayed');
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ status: 422, error: 'Unprocessable entity' });
  }
});
  // updating the hotel conformation
  router.put("/updatehotelowner",  (req, res) => {
    try {
      const id = req.body.id;
      const name = req.body.confom; 
      console.log(id)
      // console.log("not geting");
      // console.log(name)
     
        conn.query("UPDATE history SET conformation=? WHERE idHistory=?", [name, id], (err, result) => {
            if (err) {
                console.error(err);
                console.log(id);
                console.log("not geting");
                console.log(name);
                
          res.status(500).send('Error updating image');
          return;
        }
        res.send(result);
      });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });

module.exports=router;


