import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Error from './Pages/error'
import Homepage from './Pages/homepage'
import Login from './Pages/login'
import Register from './Pages/register'
import UserPage from './Pages/UserPage'
import ChatPage from './Pages/ChatPage'
import Classroom from './Pages/Classroom'
<<<<<<< HEAD
import UsersDashboard from './Pages/UserDashboard'
import DashboardPosts from './Pages/DashboardPosts'
=======
>>>>>>> 7e82a4927e16251bb5702cd11cfd85dde94cc8a5
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
      <Route path='/messages' element={<ChatPage/>}/>
      <Route path='/classrooms' element={<Classroom/>}/>
<<<<<<< HEAD
      <Route path='/Dashboard/users' element={<UsersDashboard/>}/>
      <Route path='/Dashboard/posts' element={<DashboardPosts/>}/>
=======
>>>>>>> 7e82a4927e16251bb5702cd11cfd85dde94cc8a5
      <Route path='/*' element={<Error/>}/>
    </Routes>
    </Router>
    </AuthProvider>

    </>
  )
}

export default App
