import React,{useState, useEffect} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { signOut ,setCurrentUser} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {

  const {token,currentUser} = useSelector((state)=> state.user)
  const [image , setImage ] = useState(undefined)
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch();
  const navigate= useNavigate();


   //fetch user data
   useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setUserData(data);
      dispatch(setCurrentUser(data))
    };
    
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `${token}`,
        },
      });

     
      return response.data.user;
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  console.log(userData.profileImage)

  const handleUploadImage = async(e)=>{
    e.preventDefault();
    console.log('image frontend')
    const formData = new FormData();
    formData.append('profileImage', image)
    try {
      const res =  await axios.post('/api/user/upload/profile', formData,{
        headers:{
          'Content-Type':'multipart/form-data',
          Authorization: `${token}`
        }
      })  
    } catch (error) {
      console.log(error)
    }
   
  }

  const handleSignout = async()=>{
    try {
      //const res = await axios.get('api/user/signout')
      localStorage.removeItem('userToken')
      setUserData({})
      dispatch(signOut())
      console.log('signout success')
      console.log(userData)
      navigate('/signin')
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(userData)
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold text-center p-4 mb-5'>Profile</h1>
        <form className='flex flex-col'>
          <img src={`http://localhost:3000${userData?.profileImage}`} alt="Profile"  
          className='w-24 h-24 rounded-full self-center
          cursor-pointer object-cover'/>
          

        </form>
        <div className='flex flex-col text-center p-5 '>
          <span className='p-3 text-2xl'>Username : {userData.username }</span>
          <span className='p-3 text-2xl' >Email : {userData.email }</span>
          <div className='flex flex-row justify-center p-4'>
            <form action="" className='flex flex-col' onSubmit={handleUploadImage}>
            <input type="file" accept='image/*' onChange={(e)=>setImage(e.target.files[0])} 
            className='p-4'/>
            <div className='bg-slate-700 text-white h-10 flex align-middle justify-center rounded-lg  hover:opacity-90'>
                <button type="submit">Upload Profile Image</button>
            </div>
            </form>
          </div>
          <div className='flex justify-center'>
            <button className='text-white bg-red-500 p-3 rounded-full flex items-center
             justify-center hover:opacity-90' 
             onClick={handleSignout}>signout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile