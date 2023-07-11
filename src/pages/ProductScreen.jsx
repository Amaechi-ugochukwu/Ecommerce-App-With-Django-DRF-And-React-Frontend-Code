import React, {useState ,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams , useNavigate } from "react-router-dom"
import  {listProductDetails } from "../action/productAction"


export default function ProductScreen(){

 
     const dispatch = useDispatch()
     const {id} = useParams()
     const history = useNavigate()

     const productDetails = useSelector(state => state.productDetails)

     const {product } = productDetails;

     const userLogin = useSelector(state=> state.userLogin)
     const {userInfo} = userLogin

       useEffect(() => {
        dispatch(listProductDetails(id))
     }, [dispatch , id])

     const addToCart = () => {
      if(userInfo){
      history(`/cart/${id}`)
    
      }
      else{
        history('/login')
      }
     }

    return(
        <div className=" md:p-5 sm: p-5 " >
          <div className="sm:hidden md:flex ">
          <img src={product.image} className ="width-100 , "/>
          <div className="p-5 font-bold">
          <h4>{product.name}</h4>
          <h4>{product.description}</h4>
          <p  className="pt-10 text-amber-950  ">{product.category}</p>
          <p  className="pt-10 flex justify-end text-amber-950  ">${product.price}</p>
          <h3>Status : {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h3>
      
          { product.countInStock > 0 ? (
          <div className=" flex justify-center">

          <button className="bg-amber-950 absolute md:bottom-8  sm : mt-8"  onClick={addToCart}>Add To Cart</button>

          </div>
          ) :
          (
            <div className=" flex justify-center">
            <button className="bg-white absolute md:bottom-8  " width={100} > </button>
            </div>
          )
}
          </div>
          </div>
        </div>
    )
}