import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const handlGetStartBtn = () => {
        navigate('signup')
    }
  return (
    <div>
      Home pages <br/>
      <button className='bg-black text-white' onClick={handlGetStartBtn}>
        Get Start
      </button>
    </div>
  )
}

export default HomePage
