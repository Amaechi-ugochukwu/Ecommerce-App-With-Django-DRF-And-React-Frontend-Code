import React , {useState, useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , Link , useParams , useLocation } from "react-router-dom"
import { addCart , removeCart} from "../action/cartAction"
import {FaTrash} from "react-icons/fa"

export default function Cart(){
    const {id} = useParams()
    const location = useLocation()
    const history = useNavigate()
    const dispatch = useDispatch()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const productId = id
    const cart = useSelector(state => state.cart)
    
    const userLogin = useSelector(state=> state.userLogin)

    const {userInfo} = userLogin

    const {cartItems} = cart

    useEffect(() => {
        if(productId){
            dispatch(addCart(productId , qty ))
        }
        else if(!userInfo){
            history("/login")
        }
    },[dispatch,productId])

    const deleteCart=(id) => {
       dispatch(removeCart(id))
    }
    return(
        <div>
            <h3 className="text-bold m-3 mx-10  text-center text-2xl rounded-xl uppercase">Shopping Cart</h3> <hr/>
         { cartItems.length === 0 ? (
            <div className="text-center text-bold text-white m-5 p-10 uppercase bg-black">
                <p>your cart is empty</p>
               <Link to="/"> <p> kindly go back </p> </Link>
            </div>

         )
         : (
            <div className=" grid gap-11px md:grid-cols-2  justify-between align-center ">
                <div>
                {cartItems.map(item => (
                   
                    <div  className="md:flex align-center m-5 mx-18 border border-solid hover:scale-105 duration-150 sm:grid ml-10 justify-center" key={item.product}>
                        <img src={item.image} alt="" width={130} />
                       <Link to={`/product/${item.product}`}><p className="m-5 text-1xl text-bold ">{item.name}</p></Link> 
                        <p className="m-5  font-bold  ">${item.price}</p>
                       
                        <select className ="m-5 sm:ml-5 mb-2"  value={item.qty} onChange={(e) => dispatch(addCart(item.product , Number(e.target.value)))}>

                            {
                                [...Array (item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value = {x + 1}>{x+1}</option>

                                ))
                            }

                        </select>
                        <p className="m-5" onClick={() => deleteCart(item.product)}><FaTrash/></p>
                    </div>
                  
                   
                   
                   
                ))

                }
                  </div>
                 
                 <div className="p-5 justify-center font-bold md:ml-40 mt-20  sm:ml-20">
                    <p>Total Compilation</p>
                    <h2 className="mt-10">SubTotal : {cartItems.reduce((acc, item) => acc + item.qty , 0 )}</h2>
                    <p  className="mt-10">Total Price : ${cartItems.reduce((acc,item) => acc + item.qty * item.price,0 ).toFixed(2)} </p>

                    <button className="bg-amber-950 absolute mt-10 ml-4" >Checkout</button>
                    
                 </div>

            </div>
         )

         }
        </div>
    )
}