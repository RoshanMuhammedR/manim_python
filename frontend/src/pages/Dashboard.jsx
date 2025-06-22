import React, { useState } from 'react'
import { LayoutGrid ,ListOrdered, Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
  const {authUser} = useAuthStore()
  const [displayMode,setDisplayMode] = useState('grid');

  const getIntials = (username)=> {
    return username.split(' ').map(word => word[0]?.toUpperCase() || '' ).join('');
  }
  return (
    <div className='text-[rgb(var(--text))] bg-background w-full min-h-screen'>
      <div className='w-full h-17 bg-bar flex justify-between items-center xl:px-70 lg:px-30  px-10 '>
        <span className='font-bold text-2xl'>Projects</span>
        <div className='flex items-center gap-2 select-none'>
          <div>
            🌙
          </div>
          <div>
            ☀️
          </div>
          <div className='rounded-full bg-primary w-10 h-10 flex items-center justify-center cursor-pointer'>
            {getIntials(authUser.username)}
          </div>
          <div className='hidden lg:block'>
            <span className='font-bold '>{authUser.username}</span><br/>
            <span className='font-light text-sm'>{authUser.email  }</span>
          </div>
        </div>
      </div>

      <div className='bg-background w-full xl:px-70 lg:px-30 px-10'>
        <div className='w-full mt-10 flex flex-col gap-3'>
          <span className='text-4xl font-bold'>Welcome back, {authUser.username}</span>
          <span className='text-xl font-light'>Manage your projects and track progress</span>
        </div>
        <div className="flex gap-5 w-full h-15 my-10 select-none">
          <input 
            type='text'
            className='bg-bar rounded-xl w-full p-5 text-xl outline-none'
          />
          <div className='w-20 bg-bar rounded-xl p-2 flex justify-center items-center' >
            <div 
              className={`w-10 h-full rounded ${displayMode==='grid'? 'bg-primary' : ''} flex justify-center items-center cursor-pointer`}
              onClick={()=>setDisplayMode('grid')}
            >
              <LayoutGrid/>
            </div>
            <div 
              className={`w-10 h-full rounded ${displayMode==='list'? 'bg-primary' : ''} flex justify-center items-center cursor-pointer`}
              onClick={()=>setDisplayMode('list')}
            >
              <ListOrdered />
            </div>
          </div>
          <div className="bg-primary rounded-xl w-40 h-15 flex items-center justify-center cursor-pointer">
            <Plus />
            <span>Add Project</span>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
            {[...Array(10)].map((_, idx)=>(
            <ProjectCard 
              key={idx}
              projName={'Hello project'} 
              projStatus={'In Progress'}
              projDesc={'This is my first project'}
              projDate={'19-10-2025'}
            />
          ))}
        </div>
      </div>
      <div className='w-full h-10'></div>
    </div>
  )
}

export default Dashboard
