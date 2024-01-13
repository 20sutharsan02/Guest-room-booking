import { useState } from 'react';
import './style.css';
import Addpic from './Addpicin';
import Display from "./Display";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Editpic from './Editpic';
function Pic()
{
    const sd=[
        
    {id:null,name:'',username:'',img:''}

    ];
    const[val,setval] = useState(false);
 
    const openbox =()=>
    {
        setval(true);
    }
    const closebox =()=>
    {
        setval(false);
    }

    const adduser=(use)=>
    {
        use.id=addval.length+1;
        setaddval([...addval,use]);
        
    }

    const deletepost=(id)=>
    {
        setaddval(addval.filter((addval)=>addval.id!==id));
    }
    const intial={id:null,name:'',username:'',img:''};
    const [currentw,setcurrentw]=useState(intial);
    const [editw,seteditw]=useState(false);
    const [addval,setaddval]=useState(sd);

    const editrow=(addval)=>
    {
       seteditw(true);
       console.log(seteditw);
       setcurrentw({id:  addval.id,name:addval.name,username:addval.username,img:addval.img});
    }
    const updateuser=(id,updateuser)=>
    {
        seteditw(false);
        setaddval(addval.map((user)=>(user.id===id?updateuser:user)));

    }
    return(<>
    <div className='cont'>
        <h1 className='textcl'>Add your product</h1>
        <button className='button' onClick={openbox} >Add post</button>
       
      <Addpic  val={val} addval={addval} adduser={adduser}  setval={setval} closebox={closebox}/>
      
      {editw?
        (<div> 
            <h1>ffff</h1><Editpic 
            editw={editw}
            updateuser={updateuser}
                 currentw={currentw}
                  seteditw={seteditw}
                  /></div>):
                  (<div></div>)    
         
       }

        
    </div>
      <Display  editrow={editrow} addval={addval} deleteuser={deletepost}/>
    </>);
}
export default Pic;