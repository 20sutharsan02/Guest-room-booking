import { NavLink } from "react-router-dom";
import Pic from "./Addpic"; 

function Main()
{
   const hh=()=>
    {
        console.log('kkkkk');
    }
    return(<>
    
    <button onClick={hh}><NavLink to='/pic'>addpic project</NavLink></button>
    </>);
}
export default Main;