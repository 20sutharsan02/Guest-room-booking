import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './loginstyle.css';
import Nav from './Navbar.js';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({setlogin}) {
    const navigate=useNavigate();
    const[namem,setnamem]=useState([]);
    const[usernamem,setusernamem]=useState("");
    const [formData,setFormData]=useState({
        username:'',
        password:''
    });
    const requestData={
      username: formData.username,
      password: formData.password,
      usertype:usernamem
    };
    localStorage.setItem('name',formData.username);
    console.log(localStorage.getItem('name'))
    
    const handleSubmit=(event)=>{
       event.preventDefault();
       const isFormValid = Object.values(formData).every((value) => value.trim() !== '' && value !== undefined);
       if(usernamem ==='user')
       {
         if (isFormValid) {
           axios.post('http://localhost:3001/Login', requestData)
           .then(res => {
            console.log(res);
            if (res.data && res.data.error) {
                alert(res.data.error);
            } else if(res.data === 'Success') 
            {setnamem(res.data)
              setlogin(true)
              
              navigate('/client');
            }
            else{
              alert('Wrong username or password ')
            }
          })
          .catch(err => console.log(err));
        }
      }
      else{ 
        if (isFormValid) {
          axios.post('http://localhost:3001/Login', requestData)
          .then(res => {
            console.log(res);
            if (res.data && res.data.error) {
              alert(res.data.error);
            } else if(res.data === 'Success') 
            {
              
              
              navigate('/Upload');
            }
            else{
              alert('Wrong username or password ')
              console.log(res.data)
            }
          })
          .catch(err => console.log(err));
        } 
      }
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
      };
      console.log(usernamem)
      return (
        <>
    <Nav/>
     <div className='full'>
    <br/>
     <div className='box-form'>
	<div className='left'>
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
		<h5>Login</h5>
    <button onClick={()=>{
      setusernamem("owner")
      localStorage.setItem('namem',usernamem);
    }
  }>owner</button>
    <button onClick={()=>{
      setusernamem("user")
      localStorage.setItem('namem',usernamem);
    }
    }>user</button>
   
		<p>Don't have an account? </p><Link to='/sign' >Creat Your Account</Link><p> it takes less than a minute</p>
		<div className="inputs">
			<input type="text" placeholder="user name" name='username'  required onChange={handleChange}/>
			<br/>
			<input type="password" placeholder="password" name='password' required onChange={handleChange}/>
		</div>
			
	<br/>
	<br/>
			<button onClick={handleSubmit} >Login</button>
 
	</div>
	
</div>
<br/>
</div>
<br/>
<br/>
<br/>
    <Footer/>
    </>

  );
}

export default Login;