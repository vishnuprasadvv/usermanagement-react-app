import React, { useEffect, useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'


function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange =(e) => {
    setFormData({...formData, [e.target.id] :e.target.value })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await fetch ('/api/auth/signup',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const responseStatus = res.ok;
      const data = await res.json();

      if(!responseStatus) {
        setError(true)
        setErrorMsg(data.message)
        setLoading(false) 
        return
      }
      setLoading(false)
      setError(false)
      navigate('/signin')
    }catch(err){
      setLoading(false)
      setError(true)
      setErrorMsg(err)
    }
   
  } 
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

        <input type="text" placeholder='Username'
        onChange={handleChange}
        id='username' 
        className='bg-slate-100 p-3 rounded-lg'  />

        <input type="email" placeholder='Email'
        onChange={handleChange}
        id='email'
        className='bg-slate-100 p-3 rounded-lg' />

        <input type="password" placeholder='Password'
        onChange={handleChange}
        id='password' 
        className='bg-slate-100 p-3 rounded-lg' />

        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? "Loading..." : "Sign Up"}</button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p className=''>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-400'>Sign in</span>
        </Link>

      </div>
    {error && <div className='mt-5'>
        <span className='text-red-700'> {errorMsg.length>0 ? errorMsg : 'Something went wrong'}</span>
      </div>}
      
    </div>
  )
}

export default SignUp