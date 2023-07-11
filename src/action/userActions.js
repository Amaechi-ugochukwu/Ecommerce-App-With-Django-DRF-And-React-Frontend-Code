import axios from "axios" 
import { USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS , USER_REGISTER_FAIL , USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS 
          , USER_LOGIN_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL} from "../constant/userConstant"

export const registerUser = (name , email , password) => async (dispatch) => {
    try{
        dispatch({type:USER_REGISTER_REQUEST})

        const config = {
            headers :{
                'Content-type' : 'application/json'
            }
        } 

        const {data} =
         await axios.post('http://127.0.0.1:8000/api/users/register/ ', 
         { 'name': name, 'email' : email , 'password' : password } , config )

         dispatch({type : USER_REGISTER_SUCCESS , payload : data})

         localStorage.setItem('userInfo',JSON.stringify(data))

    }
    catch(error) {
        dispatch({
            type :USER_REGISTER_FAIL ,
            payload :error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const loginUser = (email , password) => async(dispatch) => {
    try {
    dispatch({type : USER_LOGIN_REQUEST})
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    }
    const {data} = await axios.post('http://127.0.0.1:8000/api/users/login/',{'username':email , 'password' : password} , config )

    dispatch({type : USER_LOGIN_SUCCESS , payload:data})

    localStorage.setItem('userInfo' , JSON.stringify(data))
}
catch(error) {
    dispatch({type : USER_LOGIN_FAIL , payload: error.response && error.response.data.detail
    ? error.response.data.detail
        : error.message })
}
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type : USER_LOGOUT})
}


export const listUser = () => async(dispatch , getState) => {
    try{
    dispatch({type : USER_LIST_REQUEST })

    const {
        userLogin : { userInfo } ,
    } = getState()

    const config = {
        headers : {
            "Content-type" : "application/json" ,
            Authorization : `Bearer ${userInfo.token}`
        } 
    }

    const {data} = await axios.get('http://127.0.0.1:8000/api/users' , config )

    dispatch({type:USER_LIST_SUCCESS , payload : data })
}
catch (error){
    dispatch({type: USER_LIST_FAIL , payload : error.response && error.response.data.detail 
    ? error.response.data.detail
    : error.message})

}
}