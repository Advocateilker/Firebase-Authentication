import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logOut, auth, emailVerification } from '../firebase/config'
import { logout as logoutHandle } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../components/UpdateProfile'

const Home = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logOut();
    dispatch(logoutHandle())
    navigate("/login", { replace: true })


  }

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="info mx-auto py-5">
        <h1 className="flex gap-x-4 text-white items-center justify-center">
          {auth.currentUser?.photoURL && (
            <img
              src={auth.currentUser.photoURL}
              className="w-14 h-14 rounded-full  "
            />
          )}
          Your account is open ({user.email})
          <button
            onClick={handleLogout}
            className="bg-red-500 disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
            type="submit"
          >
            Log out
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="bg-sky-500 disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
              type="submit"
            >
              Confirm email
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>


    )

  }

  return (
    <div className='home-container'>
      <div className='home'>
        <Link to="/register" className=' text-white '>Sign Up</Link>
        <Link to="/login" className=' text-white '>Sign In</Link>
      </div>
    </div>
  )
}

export default Home