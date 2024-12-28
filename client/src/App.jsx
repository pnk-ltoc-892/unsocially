import { Route, Routes } from 'react-router-dom'
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
import Test from './components/Test.jsx'

function App() {

  return (
    <div >
      <Routes>
          <Route path='login' element={<Login />} />
          {/* <Route path='test' element={<Test />} /> */}
          <Route path='/' element={<ProtectedLayout />} >
              <Route path='home' element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='post/:id' element={<Post />} />

              <Route path='profile' element={<ProfileLayout />}>
                  <Route path='posts/:id' element={<Posts />} />
                  <Route path='replies/:id' element={<Replies />} />
                  <Route path='reposts/:id' element={<Reposts />} />
              </Route>
          </Route>
          <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
