
import React,{useState , useEffect} from "react"
import {useDispatch ,useSelector} from "react-redux"
import { registerUser } from "../action/userActions"
import Message from "../components/Message"
import {Link , useNavigate} from "react-router-dom"

export default function Register(){


    const dispatch = useDispatch()

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message , setMessage] = useState('')
    

   const history = useNavigate()

    const userRegister = useSelector(state => state.userRegister)

    const {error , userInfo } = userRegister

    useEffect(() => {
        if (userInfo){
            history("/login")
        }
    },[history , userInfo ])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword ){
            setMessage("passwords do not match")
        }

        else {
            dispatch(registerUser(name , email , password))
        }

    }

    return(
        <div className="text-bold" >
            <div className="flex justify-center text-red-700 m-3">
           {message && <Message variant="danger">{message}</Message>}
           <br />
           {error && <Message variant="danger">{error}</Message>}
           </div>
            <form className="grid justify-center gap-20 p-15  text-bold" onSubmit={submitHandler}>
                
        <input type='name' required placeholder = "Enter Name" value={name} onChange = {(e) => {setName(e.target.value)}} />
        <input type="email" name="email" required placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <input type="password" name="password" placeholder="Create Password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
        <button>Submit</button>

      
            </form>
            <div className="text-center m-3">
            <h2 className="text-bold text-x=1xl">if you already have an account? <Link to = "/login" className="text-red-400">login</Link></h2>
            </div>
        </div>
    )
}