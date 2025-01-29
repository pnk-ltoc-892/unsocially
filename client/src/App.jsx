import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './Pages/Protected/ProtectedLayout.jsx'
import Error from './Pages/Error.jsx'
import Home from './Pages/Protected/Home.jsx'
import Post from './Pages/Protected/Post/Post.jsx'
import ProfileLayout from './Pages/Protected/Profile/ProfileLayout.jsx'
import Login from './Pages/Login.jsx'
import { useDispatch } from 'react-redux'
import { useMemo, useState, useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice.js'
import { Toaster } from './components/ui/toaster.jsx'
import UserProfile from './Pages/Protected/Profile/UserProfile/UserProfile.jsx'
import Posts from './components/Profile/Content/Posts.jsx'
import Comments from './components/Profile/Content/Comments.jsx'
import Bookmarks from './components/Profile/Content/Bookmarks.jsx'
import People from './Pages/Protected/People.jsx'
import Search from './Pages/Protected/Search.jsx'

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 8,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 8 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <div>
      {
        init && <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      }
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
