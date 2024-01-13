import  ImageSlider from'./Dis';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Nav from './Navbar'
import Footer from './Footer'
function Client({setimage1,setnam,setimage2,setownername})
{
    const navigation=useNavigate()
    const g=localStorage.getItem('name')
    const [details,setdetails]=useState([])
    const [open,setopen]=useState(!true)
    const [name,setname]=useState("")
    const [file,setfile]=useState("")
    const [file1,setfile1]=useState("")
    const [data,setdata]=useState([]);
    const getuserdata=async()=>
    {
        const res=await Axios.get("http://localhost:3001/getdataa",{
            headers:
            {
                "Content-Type":"multipart/from-data"
            }

        })
       if(res.data.status==201)
       {
       
           console.log("data get")
           setdata(res.data.data);
       }
       else{
        console.log("error")
       }
    }

    useEffect(()=>{

          getuserdata()

    },[])
    return(<>
    <Nav/>
    <h1>hiii {g}</h1>
    <button onClick={()=>{navigation("/history")}}>booking status</button>
    <div className='con1' >
     {data.map((val) => ( 
      <div className='con1-box' key={val.idimage}>
                <h1>{val.name}</h1>
                
                <img src={`http://localhost:3001/upload/${val.image}`} alt="img"></img>
                <br/>
                <div className='mbutton'>

                    <div> 
                <button  className='addbutton1' onClick={()=>
                {
                    setnam(val.name)
                    setownername(val.username)
                    setimage1(val.image)
                    setimage2(val.imagea)
                    navigation("/slider")
                }}>check it..</button>
                    
               
                    </div>
                    </div>
               
           
            </div>
            )) }
            </div>

    <Footer/>
    </>)
}
export default Client;