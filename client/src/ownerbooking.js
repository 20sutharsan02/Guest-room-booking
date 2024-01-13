import React from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Navbar'
import './history.css';
import Footer from './Footer'
import moment from 'moment'
 function HistoryOwner({name}) {
    
    const ss=localStorage.getItem('name');
    const [data,setdata]=useState([]);
    const [pops,setpops]=useState(false);
    const [pops1,setpops1]=useState(false);
    const [pops2,setpops2]=useState("false");
    const [confom,setconfom]=useState("");
    const [id,setid]=useState("");
    const kk="happy";
    console.log(name)
    console.log(id)
    const getuserdata=async()=>
    {
        const res=await Axios.get("http://localhost:3001/getdatahisowner",{params:{ username:ss}},{
            headers:
            {
                "Content-Type":"multipart/from-data"
            }
        })
       if(res.data.status===201)
       {
           console.log("data get")
           console.log(pops)
           setdata(res.data.data); 
        }
        else{
            console.log("error")
        }

    }

    useEffect(()=>{

        getuserdata()

  },[])
  return (
    <>
    <Nav/>
    <h1>status of boooking</h1>
    {/* <button onClick={getuserdata}>show information</button> */}
    {data.length>0?(<div>
<div className='border'>
<table>
    <tr>
        <td>hotel name</td>
        <td>Booked person name</td>
        <td>name person</td>
        <td>total person</td>
        <td>from date</td>
        <td>last date</td>
        <td>total days stay</td>
        <td>status</td>
        <td>cancel</td>
        <td>conform status</td>
    </tr>
  {data.map((val)=>(
    <tr>
        <td>{val.hotelname}</td>
        <td>{val.username}</td>
        <td>{val.stayname}</td>
        <td>{val.countperson}</td>
        <td>{moment(val.fromdate).format("YYYY-MM-DD")}</td>
        <td>{moment(val.lastdate).format("YYYY-MM-DD")}</td>
        <td>{val.totaldays}</td>
        <td>{val.stauts}</td>
        <td>{(val.stauts==='false')?(<h5>cancelled</h5>):(<button onClick={(e)=>{
            setid(val.idHistory)
                setpops(true)            
                }}>cancell</button>)}</td>
        <td>{val.conformation}<button onClick={()=>
        {
            setid(val.idHistory)
setpops1(true)
        }}>change</button></td>
    </tr>
  ))}
</table>
</div>
    </div>):(<div>
        <h1>no yet booked rooms yet yeah,it so bad</h1>
    </div>)}
    {pops&&<div>
        <div className='customPopup1'>
            <div className='popupContent1'>
                <h1>Are you sure about that you are canllening the room</h1>
                <button onClick={async()=>{
                        await Axios.put("http://localhost:3001/updatehoteluser",{ id:id,stauts:pops2}).then((response)=>
                {
                    setdata(data.map((val)=>
                    {
                     return val.id==id
                     ?{stauts:val.stauts,
                       }:val;
                   }));
               
                })
                setpops(false)
                getuserdata()
                }}>okey</button>
                <button onClick={()=>{setpops(false)}}>cancel</button>
            </div>
        </div>
    </div>}
    {pops1&&<div>
        <div className='customPopup1'>
            <div className='popupContent1'>
                <h1>pls tell about room status</h1>
                <input placeholder='room conformation' onChange={(e)=>{
                    setconfom(e.target.value)
                }}/>
                <button onClick={async()=>{
                        await Axios.put("http://localhost:3001/updatehotelowner",{ id:id,confom:confom}).then((response)=>
                {
                    setdata(data.map((val)=>
                    {
                     return val.id==id
                     ?{conformation:val.conformation,
                       }:val;
                   }));
               
                })
                setpops1(false)
                getuserdata()
                }}>okey</button>
                <button onClick={()=>{setpops1(false)}}>cancel</button>
            </div>
        </div>
    </div>}
    <Footer/>
    </>
  )
}
export default HistoryOwner;
