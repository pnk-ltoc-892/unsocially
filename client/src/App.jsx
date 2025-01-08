import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './pages/protected/ProtectedLayout.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/protected/Home.jsx'
import Search from './pages/protected/Search.jsx'
import Post from './pages/protected/Post.jsx'
import ProfileLayout from './pages/protected/profile/ProfileLayout.jsx'
import Posts from './pages/protected/profile/Posts.jsx'
import Replies from './pages/protected/profile/Replies.jsx'
import Reposts from './pages/protected/profile/Reposts.jsx'
import Login from './pages/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice.js'
import { Toaster } from './components/ui/toaster.jsx'
import MyProfile from './pages/protected/profile/MyProfile/MyProfile.jsx'
import UserProfile from './pages/protected/profile/UserProfile/UserProfile.jsx'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])


  return (
    <div >
      <Toaster />
      <Routes>
        <Route path='post/:postId' element={<Post />} />
        {/* <Route path='test' element={<Test />} /> */}
        <Route path='/' element={<ProtectedLayout />} >
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='search' element={<Search />} />

          <Route path='profile' element={<ProfileLayout />}>
            <Route path='my' element={<MyProfile />} />
            <Route path='user/:username' element={<UserProfile />} />

            {/* <Route path='posts/:id' element={<Posts />} />
            <Route path='replies/:id' element={<Replies />} />
            <Route path='reposts/:id' element={<Reposts />} /> */}
          </Route>
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
