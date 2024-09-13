import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
 

  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', {email, password});

      localStorage.setItem('adminToken', response.data.token);
      
     console.log(response)
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error occurred');
      console.log(err)
    }
  };

  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Admin Login</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <form onSubmit={handleLogin} className='flex flex-col gap-4 '>
       
          <input
            type="email"
            placeholder='Email'
             className='bg-slate-100 p-3 rounded-lg'
            onChange={(e) => setEmail(e.target.value)}
          />
        
        
          <input
           className='bg-slate-100 p-3 rounded-lg'
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        
        <button type="submit" className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
