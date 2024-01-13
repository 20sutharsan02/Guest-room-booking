import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import './loginstyle.css';

function Signup()
{
    const navigation =useNavigate();
    const [user,setuser]=useState("")
    const [usertype,setusertype]=useState("")
    const [pass,setpass]=useState("");
    const [phone,setphone]=useState("");
    const [email,setemail]=useState("");
    const [detail,setdetail]=useState([]);
   const valid=()=>
   {
    Axios.post('http://localhost:3001/signincreate',{
      // employe:id,
      username:user,
      password:pass,
      phone:phone,
      email:email,
      usertype:usertype
     
    }).then(()=>{
      console.log("success")
      // auto update
      setdetail([...detail,{
        username:user,
      password:pass,
      phone:phone,
      email:email,
       usertype:usertype}])
    });
    Axios.post('http://localhost:3001/logincreate',{
         username:user,
         password:pass,
         usertype:usertype
         
       }).then(()=>{
               
            console.log("success")
            navigation('/')
        
       });
    if(user!="" &&pass!="" &&phone!="" &&email!="")
    {
        
        // setuser("")
        // setpass("")
        // setphone("")
        // setemail("")
        // navigation('/')
      }
    else{
        alert("plse fill the form")
    }
   }
   console.log(usertype)
    return(<>

<div className="full">
<div className="box-form">
	<div className="left">
		<div className="overlay">
		
		<h1>MyBookie</h1>
		<br/>
		<h2>There’s a smarter way to MyBookie around</h2>
			<p>Sign up with your name and password to get exclusive access to discounts and savings on OYO stays and with our many travel partners.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		Curabitu</p>
		
		</div>
	</div>
	
	
		<div className="right">
		<h5>Sign</h5>
		<button onClick={()=>{
      setusertype("owner")
    }
    }>owner</button>
    <button onClick={()=>{
      setusertype("user")
    }
    }>user</button>
		<div className="inputs">
			{/* <label>username</label> */}
            <input  placeholder="username"  onChange={(event)=>
            {
                setuser(event.target.value);
            }} required />
            <br/>
            {/* <label>password</label> */}
            <input type="password" placeholder="password"   onChange={(event)=>
            {
                setpass(event.target.value);
            }} required/>
            <br/>
            {/* <label>phone number</label> */}
            <input type="number" placeholder="phone number"   onChange={(event)=>
            {
                setphone(event.target.value);
            }} required/>
            <br/>
            {/* <label>email</label> */}
            <input type="email" placeholder="email"   onChange={(event)=>
            {
                setemail(event.target.value);
            }} required/>
		</div>
			
			<br/><br/>
			
		
			
		<br></br>
		<button onClick={valid} >submit</button>
	</div>
	
</div>
</div>
 
 {/* <div className="fist">
        <div className=""second>
            <h1>SIGN IN</h1>
           <label>username</label>
            <input  placeholder="username"  onChange={(event)=>
            {
                setuser(event.target.value);
            }} required />
            <br/>
            <label>password</label>
            <input type="password" placeholder="password"   onChange={(event)=>
            {
                setpass(event.target.value);
            }} required/>
            <br/>
            <label>phone number</label>
            <input type="number" placeholder="phone number"   onChange={(event)=>
            {
                setphone(event.target.value);
            }} required/>
            <br/>
            <label>email</label>
            <input type="email" placeholder="email"   onChange={(event)=>
            {
                setemail(event.target.value);
            }} required/>
            <br></br>
            <button onClick={valid} >submit</button>

        </div>

    </div>
    <button ><NavLink to='/pic'>addpic project</NavLink></button> */}
    </>);
}
export default Signup;