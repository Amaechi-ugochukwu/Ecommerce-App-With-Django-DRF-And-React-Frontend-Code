import { BrowserRouter , Routes , Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductScreen from "./pages/ProductScreen"
import Register from "./pages/Register"
import Cart from "./pages/Cart"

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path = "/"  Component={Home}  />
      <Route path = "/product/:id"  Component={ProductScreen} />
      <Route path ="/register" Component={Register} />
      <Route path ="/login" Component={Login} />
      <Route path="/cart/:id?" Component={Cart}/>
      
    </Routes>
    
    </BrowserRouter>
    
  
  )
}