import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './Pages/Protected/ProtectedLayout.jsx'
import Error from './Pages/Error.jsx'
import Home from './Pages/Protected/Home.jsx'
import Post from './Pages/Protected/Post/Post.jsx'
import ProfileLayout from './Pages/Protected/Profile/ProfileLayout.jsx'
import Login from './Pages/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice.js'
import { Toaster } from './components/ui/toaster.jsx'
import UserProfile from './Pages/Protected/Profile/UserProfile/UserProfile.jsx'
import Posts from './components/Profile/Content/Posts.jsx'
import Comments from './components/Profile/Content/Comments.jsx'
import Bookmarks from './components/Profile/Content/Bookmarks.jsx'
import People from './Pages/Protected/People.jsx'
import Search from './Pages/Protected/Search.jsx'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedLayout />} >
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
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
