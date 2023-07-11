import {createStore} from "@reduxjs/toolkit"
import {combineReducers , applyMiddleware} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

import {productListReducer , productDetailsReducer} from "./reducer/productReducer"
import { registerUserReducer , loginUserReducer, userListReducer } from "./reducer/userReducer"
import { cartReducer } from "./reducer/cartReducer"




    const reducer = combineReducers({
        productList : productListReducer ,
        productDetails : productDetailsReducer ,
        

        userLogin : loginUserReducer , 
        userRegister: registerUserReducer,
        userList : userListReducer , 
       
        cart : cartReducer
    })

    const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

    const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

    const initialState = {

        userLogin : { userInfo : userInfoFromStorage } , 
        cart : { cartItems : cartItemsFromStorage } ,
                                                                                                                
    }

    const middleware =  [thunk]

    const store = createStore(reducer ,initialState ,
          composeWithDevTools(applyMiddleware(...middleware)))

export default store