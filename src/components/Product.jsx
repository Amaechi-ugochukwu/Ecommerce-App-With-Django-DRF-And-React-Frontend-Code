
import {Link} from "react-router-dom";

export default function Product({ product }){
    return(
        <div className="px-10">
               <Link to ={`/product/${product._id}`}>
               <img src={product.image} alt = {product.name} className="rounded-lg"/>
               </Link>
               <div className="m-3 text-center">
                <p>{product.name}</p>
                <p>{product.category}</p>
                </div>
        </div>
    )
}