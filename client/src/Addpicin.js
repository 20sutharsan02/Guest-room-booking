import { useState } from 'react';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Addpic(props)
{
    const intial={id:null,name:'',username:'',img:''};
        const [user,setuser]=useState(intial);
        const handle=(event)=>//improtant
        {
            const { name, value, files } = event.target;
                if (name === 'img') 
                {
                setuser({ ...user, [name]: files[0] });
                } 
                else {
                setuser({ ...user, [name]: value });//improtant
                }
            console.log(user);
        }
        
        const closebox =()=>
        {
            
            props.setval(false);
            setuser(intial);
        }
    return(<>
      {
            props.val && (
                <div className="customPopup">
                <div className="popupContent">
                    <h1 className='textcl'>happy to add your details</h1>
                    <form   onSubmit={
                        event=>{
                            event.preventDefault();
                            if(!user.name|| !user.username || !user.img)return;
                            props.adduser(user);
                        setuser(intial);
                            closebox();
                            toast.success('🦄 add pic', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });

                        }}>
                        <lable className="label">file name</lable>
                        <input type='text'  name="name" onChange={handle} value={user.name} placeholder='enter the name'/>
                        <lable className="label">username</lable>
                        <input type='text' name="username" onChange={handle}  value={user.username} placeholder='enter the username'/>
                        <input type='file' accept="image/*" name="img" onChange={handle}  />
                    <div className='bui-cont'>
                        
                    <button className='bui'onClick={closebox }>close</button>
                   <button className='bui'>Addpost</button>
                    </div>
                    </form>
                </div>
                </div> )
                }
                <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            />
                            <ToastContainer />
    
    </>);
}
export default Addpic;