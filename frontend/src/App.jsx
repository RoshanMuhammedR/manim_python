import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import {Toaster} from 'react-hot-toast'
import SignUp from './pages/SignUp'
import SignIn from './pages/SIgnIn'
import { useAuthStore } from './store/useAuthStore'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import SceneWorkspace from './pages/SceneWorkspace'
const App = () => {
  const {authUser,checkAuth} = useAuthStore();
  
  useEffect(() => {
    const getUserData = async () => {
      checkAuth();
    };
    getUserData();
  }, []);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/dashboard' /> : <SignUp/>}/>
        <Route path='/signin' element={authUser ? <Navigate to='/dashboard'/> : <SignIn />}/>
        <Route path='/dashboard' element={authUser ? <Dashboard /> : <Navigate to='/signin' />} />
        <Route path='/dashboard/:projectId' element={authUser ? <SceneWorkspace /> : <Navigate to='/signin' />} />
      </Routes>
    </div>
  )
}

export default App