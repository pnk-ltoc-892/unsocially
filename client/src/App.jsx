import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './pages/protected/ProtectedLayout.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/protected/Home.jsx'
import Post from './pages/protected/Post/Post.jsx'
import ProfileLayout from './pages/protected/profile/ProfileLayout.jsx'
import Login from './pages/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice.js'
import { Toaster } from './components/ui/toaster.jsx'
import UserProfile from './pages/protected/profile/UserProfile/UserProfile.jsx'
import Posts from './components/Profile/Content/Posts.jsx'
import Comments from './components/Profile/Content/Comments.jsx'
import Bookmarks from './components/Profile/Content/Bookmarks.jsx'
import People from './pages/protected/People.jsx'
import Search from './pages/protected/Search.jsx'
import Header from './components/header/Header.jsx'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])


  return (
    <div >
      <Header />
      <Toaster />
      <Routes>
        <Route path='post/:postId' element={<Post />} />
        {/* <Route path='test' element={<Test />} /> */}
        <Route path='/' element={<ProtectedLayout />} >
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='people' element={<People />} />
          <Route path='search' element={<Search />} />

          <Route path='profile' element={<ProfileLayout />}>
            <Route path='user/:username' element={<UserProfile />} >
              <Route path='posts' element={<Posts />} />
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
