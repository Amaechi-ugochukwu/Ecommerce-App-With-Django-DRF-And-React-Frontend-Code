
import { useDispatch , useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../action/userActions"
import { FaShoppingCart , FaSignOutAlt , FaUser} from "react-icons/fa"



export default function Navbar(){
  const userLogin = useSelector( state => state.userLogin)

   const {userInfo} = userLogin

  const dispatch = useDispatch()
    
  const userLogout = () => {
    dispatch(logoutUser())
  }
  
    return(
      <div>
                <div className=" p-5 bg-white text-amber-950 shadow-sm font-bold flex justify-between ">
           <div>
             <Link to ="/">
           <h4>Auc Commerce</h4>
           </Link>
           </div>
          
           <div>
          
            </div>

            { !userInfo && (
            <div className="flex">
              <Link to = "/login">
                <p className="mr-3"><FaUser/></p>
                </Link>
                <p><Link to="/cart"><FaShoppingCart/></Link></p>
                </div>
                )
                }

    { userInfo && userInfo.isAdmin &&(
         
         <div className="flex " >
        <p className="mr-2">Admin</p>
           <select className="mr-3">
          <option>Product</option>
          <option>User</option>
          <option>Orders</option>
         </select>
              
         <p onClick={userLogout}><FaSignOutAlt/></p>
         </div>
        
         )
         }

         { userInfo && !userInfo.isAdmin && (
  
        <div className="flex">
          <p className=" md:uppercase mr-1">{userInfo.name}</p>
          <p className="ml-3"><Link to="/cart"><FaShoppingCart/></Link></p>
          <p className="ml-3"><FaUser/></p>
          <p className="ml-3" onClick={userLogout}><FaSignOutAlt/></p>
        </div>
      
         ) 

         }

       
        </div>
        </div>
    )
}