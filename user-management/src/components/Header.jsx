import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center 
        max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold'>user-management-App</h1>
            </Link>
            <ul className="flex gap-4">
              {currentUser ? <Link to= '/profile' >
                <li>Home</li>
                </Link> :
                ''
                }
                
               
                {currentUser ? (
                  <img src={`http://localhost:3000${currentUser.profileImage}`}
                  alt='profile'
                  className='w-8 h-8 rounded-full border border-blue-800'
                  ></img>
                ):
                (
                <Link to= '/signin'>
                  <li>Sign-In</li>
                </Link>
                )}
               
            </ul>
        </div>
    </div>
  )
}

export default Header