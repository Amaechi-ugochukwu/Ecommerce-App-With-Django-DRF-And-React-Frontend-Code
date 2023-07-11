import React,{useState , useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import { Link , useNavigate} from "react-router-dom"
import { loginUser } from "../action/userActions"




export default function Login(){

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)

    const {error, userInfo} = userLogin
    
    const dispatch = useDispatch()
    
    const history = useNavigate()
    
    useEffect(() => {
        if(userInfo) {
            history("/")
        }

    },[history , userInfo])

const submitHandler = (e) => {
     e.preventDefault()
     dispatch(loginUser(email , password))
}

    return(
        <div>
            {error && <p className="text-center text-red-700">{error}</p>}
            <form className="grid justify-center gap-20 p-20  text-bold"  onSubmit={submitHandler}>
                <input type="email" name="email" required placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" name="password" placeholder="Create Password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
             <button>Submit</button>
            </form>
            <div className="text-center">
            <h2 className="text-bold text-x=1xl top-[-100]">if you dont have an account? <Link to = "/register" className="text-red-400">register</Link></h2>
            </div>
        </div>
    )
}