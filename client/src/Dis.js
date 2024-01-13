import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom'; 
import { Link, useNavigate } from 'react-router-dom';
import './loginstyle.css';
import Nav from './Navbar'
import Footer from './Footer'
import moment from 'moment'
// import './productdisplay.css'

const ImageSlider = ({id,image1,name,image2,ownername}) => {
  
 const [mm,setmm]=useState(false);
 const [username,setusername]=useState("")
 const [days,setdays]=useState("");
 const [fromdate,setfromdate]=useState("");
 const [lastdate,setlastdate]=useState("");
 const [person,setperson]=useState("");
 const [noperson,setnoperson]=useState("");
 const [roomsno,setroomsno]=useState("");
  const navigation=useNavigate()
  const ss=localStorage.getItem('name');
  console.log(ownername)
  console.log(name)
  const closebox=()=>
  {
      setmm(false);
  }
  const adduser=async(e)=>
    {
        e.preventDefault();
        var formData=new FormData();
        console.log(name)
        formData.append("noperson",noperson)
        formData.append("days",days)
        formData.append("fromdate",fromdate)
        formData.append("lastdate",lastdate)
        formData.append("person",person)
        formData.append("room",roomsno)
        formData.append("username",ss)
        formData.append("hotelname",name)
        formData.append("image1",image1)
        const config={
            headers:
            {
                "Content-Type":"multipart/from-data"
            }

        }
        const res1=await Axios.post("http://localhost:3001/his",{
          username:username,
          days:days,
          fromdate:fromdate,
          lastdate,lastdate,
          person:person,
          noperson:noperson,
          room:roomsno,
          username:ss,
          hotelname:name,
          image1:image1,
          ownername:ownername
      
      
      }).then(()=>
      {
        console.log("success")
      })
        console.log(res1);
        setmm(false)
    }
    console.log(noperson)
    console.log(person)
    console.log(fromdate)
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Show arrows for navigation
    dots: true, // Show dots for navigation
  };
  const [data,setdata]=useState([]);
  const [yes,setyes]=useState("");
  var dat=0;
  const check=async()=>
  {
    const res=await Axios.get("http://localhost:3001/getdatahisdate",{
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
  const checkdata=()=>{
    data.map((res)=>
      {
               if((moment(res.lastdate).format("YYYY-MM-DD"))<fromdate&&res.hotelname===name &&res.username===ss)
               {
                 console.log(res.lastdate+"  "+lastdate)
                 
                 console.log(dat)
                 console.log(yes)
               }
               else
               {
                 console.log(res.lastdate+"  "+lastdate)
                 console.log(res.username+"  "+ss)
                 console.log(res.hotelname+"  "+name)
                 setyes(false)
                 dat=dat+1;
                 console.log(yes)
               }
      })
      if(dat<=0)
      {
        setyes(true)
      }
  }

  return (<>
   
    <Nav/>
    
    <div className='main'>
    <h1>{name}</h1>

  <div className='imageshow'>
  <Slider {...settings}>
            <div>
            
              <img src={`http://localhost:3001/upload/${image1}`} alt={`Image1 ${image1}`} />
            </div>
            <div>
              <img src={`http://localhost:3001/upload/${image2}`} alt={`Image2 ${image2}`} />
             
            </div>
          </Slider>  
  </div>
        <h1>12 guests
      5 bedroom
      8 beds
      2.5 bathroom</h1>
    <div className='sad'>

   <p>Welcome to the {name}! Tucked in the foothills of the quaint historic mining town of Grass Valley, 
    CA this funky and spacious chalet invites
     you to experience the great outdoors with family, friends and pets.
     Enjoy the hot tub, basketball court, treehouse, kids rooms, bbq, fire-pit, 
     outdoor theater, and more. One hour from Tahoe and 10 minutes to town, 
     you’re never short of things to explore.</p>
     <h1>What this place offers!!</h1>
     <h3>
      Garden View
      </h3>
      <h3>Fast wifi-94Mbps   </h3>
      <h3>Free parking on premises      </h3>
      <h3>"50" HDTV with Disney+, Netflix"</h3>
      <h3>Pets Allowed</h3>
      <h3>Security cameras on property</h3>
      <h3>Free washer – In unit</h3>
    <button onClick={
      ()=>
      {
        setmm(true)
      }
    }>rent</button>
    {mm&&(<div>
      <div>
        <div className="customPopup1">
                <div className="popupContent1">
                    <h1>Booking details</h1>
    <input type="text" placeholder="name of person use," name="name" onChange={(event)=>{
        setperson(event.target.value)
        
    }}/>
    <input type="text" placeholder="enter no of days stay" name="day" onChange={(event)=>
    {
        setdays(event.target.value)
    }}/>
    from data
     <input type="date" placeholder="from date" name="fromdate" onChange={(event)=>
    {
      setfromdate(event.target.value)
    }}/>
    lastdate
     <input type="date" placeholder="vacate date" name="lastdate" onChange={(event)=>
    {
      setlastdate(event.target.value)
    }}/>
    <button onClick={()=>{check();checkdata()}}>check the room avaliable</button>
    {(yes===true)?(<div>room avaliable</div>):(<div></div>)}
    {(yes===false)?(<div>no room avaliable</div>):(<div></div>)}
    <br/>
    <br/>
    <input type="text"  placeholder="how many person" name="person" onChange={(event)=>
    {
        setnoperson(event.target.value
          )
    }}/>
    <br/>
    <input type="text"  placeholder="how rooms" name="room" onChange={(event)=>
    {
        setroomsno(event.target.value)
        
    }}/>
    <br/>
    <div className='mbutton'>
    <button  className='addbutton1'
     onClick={adduser}>BOOK it now</button>
    <button className='addbutton1' onClick={closebox}>close</button>
    </div>
    </div>
    </div>
    </div>
    </div>)

    }
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
    <Footer/>
    </>
  );
};

export default ImageSlider;
