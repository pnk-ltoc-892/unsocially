import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import ProtectedLayout from './pages/protected/ProtectedLayout.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/protected/Home.jsx'
import Post from './pages/protected/Post/Post.jsx'
import ProfileLayout from './pages/protected/profile/ProfileLayout.jsx'
import Login from './pages/Login.jsx'
import { useDispatch } from 'react-redux'
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
    // console.log(container);
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
            quantity: 1,
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
        <Route path='/' element={<ProtectedLayout setInit={setInit} init={init} />} >
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
