import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Documentation from './components/Documentation'
import Login from './auth/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import SignUp from './auth/SignUp'
import Developer from './components/Developer'
import ChatPortal from './components/ChatPortal'
import EditorApp from './components/code/App'
import Interviewer from './components/Interviewer'

const App = () => {
  return (
    <div className="app-layout">
      <Navbar></Navbar>

      <Routes>
        {/* navbar main route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route
          path='/developer'
          element={<ProtectedRoute><Developer /></ProtectedRoute>}
        />
        <Route
          path='/interviewer'
          element={<ProtectedRoute><Interviewer /></ProtectedRoute>}
        />
        <Route
          path='/code-editor'
          element={<ProtectedRoute><EditorApp /></ProtectedRoute>}
        />
        <Route
          path='/chat-portal'
          element={<ProtectedRoute><ChatPortal /></ProtectedRoute>}
        />
        {/* auth route */}
        
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signUp' element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App
