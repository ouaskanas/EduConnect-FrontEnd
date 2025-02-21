import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Error from './Pages/error'
import Homepage from './Pages/homepage'
import Login from './Pages/login'
import Register from './Pages/register'
import UserPage from './Pages/UserPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Auth/AuthProvider'
function App() {
  
  return (
    <>
    <AuthProvider> 
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/mesposts' element={<UserPage/>}/>
      <Route path='/*' element={<Error/>}/>
    </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
