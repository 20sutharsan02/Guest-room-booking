import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Display(props)
{
    
    return(<>
    {props.addval.length>0?(
            props.addval.map((addval)=>(
                <div key={addval.id} className='card'>
                    <div className="card1">
                 <h1>{addval.name}</h1>
                  {addval.img && addval.img instanceof File && <img src={URL.createObjectURL(addval.img)} alt="not displayed" />}
                 <p>{addval.username}</p>
                 <div>
                <button className='bui' onClick={()=>props.editrow(addval)}>edit</button>

                <button onClick={()=> {props.deleteuser(addval.id)
                        toast.success('🦄 sucessfully deleted', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            }); }
                } className='bui'>delete</button>
               </div>
               </div>
               </div>

            ))
        ):(
            
                <h1 style={{textAlign:'center'}}>Add post</h1>
            
        )
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
                            {/* Same as */}
                            <ToastContainer />
    
    </>);
}
export default Display;