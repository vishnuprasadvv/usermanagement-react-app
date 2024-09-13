import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { signInError, signInStart, signInSuccess, setToken } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';

function SignIn() {

  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=>state.user)

  const navigate = useNavigate();
  //intialize dispatch
  const dispatch = useDispatch()

  const handleChange =(e) => {
    setFormData({...formData, [e.target.id] :e.target.value })
  }

  //handle signin
  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      dispatch(signInStart())
      const res = await axios.post('/api/auth/signin', formData);
     dispatch(setToken(res.data.token))
      console.log(res.data)
      //navigate to home 
      dispatch(signInSuccess(res.data.user))
      localStorage.setItem('userToken', res.data.token);
      navigate('/profile')
    }catch(err){
      dispatch(signInError(err.response?.data.message))
      console.log(err)
      console.log('error')
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>

      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

        <input type="email" placeholder='Email'
        onChange={handleChange}
        id='email'
        className='bg-slate-100 p-3 rounded-lg' />

        <input type="password" placeholder='Password'
        onChange={handleChange}
        id='password' 
        className='bg-slate-100 p-3 rounded-lg' />

        <button  className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? "Loading..." : "Sign In"}</button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p className=''>Don't have an account? Go to </p>
        <Link to='/signup'>
        <span className='text-blue-400'>Sign Up</span>
        </Link>

      </div>
    {error && <div className='mt-5'>
        <span className='text-red-700'>{ 'Something went wrong!'}</span>
      </div>}
      
    </div>
  )
}

export default SignIn