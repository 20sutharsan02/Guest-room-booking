import  ImageSlider from'./Dis';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from './Footer.js';
import Nav from './Navbar.js';


function Upload({setimage1,setimage2,setnam,setownername})
{
    const navigation=useNavigate()
    const [details,setdetails]=useState([])
    const [open,setopen]=useState(!true)
    const [name,setname]=useState("")
    const [file,setfile]=useState("")
    const [file1,setfile1]=useState("")
    const [edit,setedit]=useState(false);
    const [editid,seteditid]=useState("");
    const ss=localStorage.getItem('name');
    // console.log(ss);
    // console.log(editid);
    const openbox=()=>
    {
        setopen(true);
    }
    const closebox=()=>
    {
        setopen(false);
    }
    const closeeditbox=()=>
    {
        setedit(false);
    }

    // adding the user data
    const adduser=async(e)=>
    {
        e.preventDefault();
        var formData=new FormData();
        console.log(name)
        console.log(editid)
        formData.append("image1",file)
        formData.append("image2",file1)
        formData.append("name",name)
        formData.append("username",ss)
        const config={
            headers:
            {
                "Content-Type":"multipart/from-data"
            }

        }
        const res=await Axios.post("http://localhost:3001/register",formData,config)
        // console.log(res);
        setopen(false)
        setfile("")
        setname("")
        setfile1("")
    }

    // displaying the particular id user data
     const [data,setdata]=useState([]);
    const getuserdata=async()=>
    {
        const res=await Axios.get("http://localhost:3001/getdata",{params:{ username:ss}},{
            headers:
            {
                "Content-Type":"multipart/from-data"
            }
        })
       if(res.data.status===201)
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
    // frquencly update the page use this
    // useEffect(()=>{

    //       getuserdata()

    // },[data])

    // delete the user details
    const dele=(id)=>
    {
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        setdata(
          data.filter((val)=>
          {
            return val.id!=id;
          })
        );
      })
      navigation('/upload')
    }
    // update or change the user hotel details
    const updatehotel=async()=>
{
    const formData = new FormData()
    formData.append('name', name)
    formData.append('id', editid)
    formData.append('image1', file) // Assuming 'file' contains the first image file
    formData.append('image2', file1)
    const res=await Axios.put("http://localhost:3001/updatehotel",formData)
    .then((response)=>
                {
                setdata(response);
                })
};

    return (
        <>
    <Nav/>
    <div className='mma'>

    <h1>Welcom back {ss}</h1>
    <button onClick={()=>{
        
        navigation("/ownerhistory")}}>booking status</button>
    <button className='addbutton' onClick={openbox}>add pic</button> 
                {open&&<div>
                    <div className="customPopup1">
                            <div className="popupContent1">
                                <h1>ADD your details</h1>
                <input type="text" placeholder="hotel name" name="name" onChange={(event)=>{
                    setname(event.target.value)
                    
                }}/>
                <input type="file" placeholder="choose the file" name="photo" onChange={(event)=>
                {
                    setfile(event.target.files[0])
                }}/>
                <br/>
                <br/>
                <input type="file"  placeholder="choose the file" name="photo" onChange={(event)=>
                {
                    setfile1(event.target.files[0])
                }}/>
                <br/>
                <br/>
                <div className='mbutton'>
                <button  className='addbutton1'
                onClick={adduser}>upload</button>
                <button className='addbutton1' onClick={closebox}>close</button>
                </div>
                </div>
                </div>
                </div>}
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
                        <button className='addbutton1' onClick={()=>
                        {
                            const id=val.idimage
                            Axios.delete(`http://localhost:3001/delete/${val.idimage}`).then((response)=>{
                                setdata(
                                    data.filter((val)=>
                                    {
                                        return val.idimage!=id;
                                    })
                                    );
                                })
                            }}>delete</button>
                            <button className='addbutton1'onClick={()=>{
                                setedit(true)
                                 seteditid(val.idimage)                                 
                                 }} >edit</button>
                            </div>
                            </div>
                    </div>
                    )) }
                    </div>

                    {edit&&<div>
                    <div className="customPopup1">
                            <div className="popupContent1">
                                <h1>Edit your details</h1>
                <input type="text" placeholder="hotel name" name="name" onChange={(event)=>{
                    setname(event.target.value)
                    
                }}/>
                <input type="file" placeholder="choose the file" name="photo" onChange={(event)=>
                {
                    setfile(event.target.files[0])
                }}/>
                <br/>
                <br/>
                <input type="file"  placeholder="choose the file" name="photo" onChange={(event)=>
                {
                    setfile1(event.target.files[0])
                }}/>
                <br/>
                <br/>
                <div className='mbutton'>
                <button  className='addbutton1'
                onClick={async()=>{
                    // updatehotel(editid)
                    console.log(editid)
                    const formData = new FormData()
                    formData.append('name', name)
                    formData.append('id', editid)
                    formData.append('image1', file) // Assuming 'file' contains the first image file
                    formData.append('image2', file1)
                    const config={
                        headers:
                        {
                            "Content-Type":"multipart/from-data"
                        }
            
                    }
                   await Axios.put("http://localhost:3001/updatehotel",formData,config).then((response)=>
                {
                    setdata(data.map((val)=>
                    {
                     return val.id==editid
                     ?{idimage:val.id,
                       name:val.name,
                       image:val.image,
                       imagea:val.imagea,}:val;
                   }));
               
                })

                setedit(false)
                }
                }>upload</button>
                <button className='addbutton1' onClick={closeeditbox}>close</button>
                </div>
                </div>
                </div>
                </div>}

    </div>
    <Footer/>
    </>)
}
export default Upload;