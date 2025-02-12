import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './pages/protected/ProtectedLayout.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/protected/Home.jsx'
import Post from './pages/protected/Post/Post.jsx'
import ProfileLayout from './pages/protected/profile/ProfileLayout.jsx'
import Login from './pages/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useState, useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice.js'
import { Toaster } from './components/ui/toaster.jsx'
import UserProfile from './pages/protected/profile/UserProfile/UserProfile.jsx'
import Posts from './components/profile/Content/Posts.jsx'
import Comments from './components/profile/Content/Comments.jsx'
import Bookmarks from './components/profile/Content/Bookmarks.jsx'
import People from './pages/protected/People.jsx'
import Search from './pages/protected/Search.jsx'

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ComponentTest from './pages/ComponentTest.jsx'
import Spinner from './components/UI Components/Spinner.jsx'
import CheckAuth from './pages/auth/CheckAuth.jsx'
import AuthLayout from './pages/layout/AuthLayout.jsx'
import UserLayout from './pages/layout/UserLayout.jsx'

function App() {
  const {isloading} = useSelector(state => state.auth);
  // const isloading = true;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  // Manage a loader and to check auth,
  // After first call for auth, set the auth in session storage itself,
  //  will this solve the problem ? - Lets see

  if(isloading){
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <Toaster />
      <Routes>

        <Route 
          path='/auth' 
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>}
        >
          <Route path='login' element={<Login />}/>
        </Route>

        // Inside This Code Only '/login' can handled along with AuthLayout Using Nesting without using '/auth' additional route
        <Route
            path='/' 
            element={
                <CheckAuth>
                  <UserLayout />
                </CheckAuth>} 
        >
          <Route path='home' element={<Home />} />
          <Route path='people' element={<People />} />
          <Route path='search' element={<Search />} />
          <Route path='post/:postId' element={<Post />} />

          <Route path='profile' element={<ProfileLayout />}>
            <Route path='user/:username' element={<UserProfile />} >
              <Route path='' element={<Posts />} />
              <Route path='comments' element={<Comments />} />
              <Route path='saved' element={<Bookmarks />} />
            </Route>
          </Route>
        </Route>
        <Route path='/test' element={<ComponentTest />}/>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
