import React , {useState , useEffect} from  "react"
// import axios from "axios"
import {useDispatch , useSelector} from "react-redux"
import { listProducts } from "../action/productAction"

import Product from "../components/Product";



export default function Home() {

const dispatch = useDispatch()
const productList = useSelector(state => state.productList)
const {error , loading , products} = productList;

useEffect(() => {
    dispatch(listProducts())
}, [dispatch])

// const [products , setProducts] = useState([])

//    useEffect( () => {

//     async function fetchProducts(){

//         const { data } = await axios.get("http://127.0.0.1:8000/api/products/")
//         setProducts(data)

//     }
//     fetchProducts()
// },[])

 

    return (
        <div className=" font-bold bg-white- ">
            
            <div className="grid  md:grid-cols-3 gap-11 p-5">
        {products.map(product  => (
            <div key={product._id}  className=" hover:scale-105 duration-150 rounded-lg" >
             <Product product={product}  />
            </div>

        ))
        
        }
        </div>
        </div>
    )
}