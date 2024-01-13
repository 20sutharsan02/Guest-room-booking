import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pic from './Addpic';
import './App.css';
import ImageSlider from './Dis';
import Main from "./Main";
import Sigup from './NewUserPage';
import Upload from './imageUpload';
import Login from './loginpage';
import { useState } from "react";
import Footer from './Footer.js';
import Nav from './Navbar'
import Client from './Client.js';
import History from './History.js'
import OwnerHis from './ownerbooking.js'
function App() {
  const [type,settype]=useState("")
  const[login,setlogin]=useState(false)
  const [image,setimage]=useState([])
  const [name,setname]=useState("")
  const [ownername,setownername]=useState("")
  const [image1,setimage1]=useState("")
  const [image2,setimage2]=useState("")

  const [id,setid]=useState("")

  return (
    <div className="App">
       <>
    <BrowserRouter>
    <Routes>

      <Route path='/history' element={<History/>}></Route>
      <Route path='/nav' element={<Nav login={login}/>}></Route>
      <Route path='/Ownerhistory' element={<OwnerHis
       name={name}
       />}></Route>

<Route path='/upload' element={<Upload 
    setimage1={setimage1}
    setimage2={setimage2}
    setnam={setname}
    setimage={setimage}
    setownername={setownername}


/>}></Route>
<Route path='/' element={<Login
setlogin={setlogin} 
/>}></Route>
<Route path='/sign' element={<Sigup />}></Route>
<Route path='/Main' element={<Main />}></Route>
<Route path='/slider' element={<ImageSlider  
          image1={image1}
          image2={image2}
          name={name}
          ownername={ownername}
    setownername={setownername}
          setimage1={setimage1}
          setimage2={setimage2}
          setnam={setname}
/>}></Route>
  

    <Route path='/pic' element={<Pic/>}></Route>


    <Route path='/footer' element={<Footer/>}></Route>
    <Route path='/client' element={<Client
    setimage1={setimage1}
    setimage2={setimage2}
    setnam={setname}
    setimage={setimage}
    setownername={setownername}
    
    />}></Route>
      </Routes>

      </BrowserRouter>
      </>
    </div>
   
  );
}

export default App;
