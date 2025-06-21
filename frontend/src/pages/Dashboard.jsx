import React, { useState } from 'react'
import { LayoutGrid ,ListOrdered, Plus } from 'lucide-react';

const Dashboard = () => {
  const [displayMode,setDisplayMode] = useState('grid')
  return (
    <div className='text-[rgb(var(--text))] bg-background w-full h-screen overflow-hidden'>
      <div className='w-full h-17 bg-bar flex justify-between items-center xl:px-70 lg:px-30  px-10 '>
        <span className='font-bold text-2xl'>Projects</span>
        <div className='flex items-center gap-2 select-none'>
          <div>
            🌙
          </div>
          <div>
            ☀️
          </div>
          <div className='rounded-full bg-primary w-10 h-10 flex items-center justify-center'>
            RM
          </div>
          <div className='hidden lg:block'>
            <span className='font-bold '>Roshan Muhammed</span><br/>
            <span className='font-light text-sm'>roshan@gmail.com</span>
          </div>
        </div>
      </div>

      <div className='bg-background w-full h-screen xl:px-70 lg:px-30 px-10'>
        <div className='w-full mt-10 flex flex-col gap-3'>
          <span className='text-4xl font-bold'>Welcome back, Alex</span>
          <span className='text-xl font-light'>Manage your projects and track progress</span>
        </div>
        <div className="flex gap-5 w-full h-15 my-10">
          <input 
            type='text'
            className='bg-bar rounded-xl w-full p-5 text-xl outline-none'
          />
          <div className='w-20 bg-bar rounded-xl p-2 flex justify-center items-center' >
            <div 
              className={`w-10 h-full rounded ${displayMode==='grid'? 'bg-primary' : ''} flex justify-center items-center`}
              onClick={()=>setDisplayMode('grid')}
            >
              <LayoutGrid/>
            </div>
            <div 
              className={`w-10 h-full rounded ${displayMode==='list'? 'bg-primary' : ''} flex justify-center items-center`}
              onClick={()=>setDisplayMode('list')}
            >
              <ListOrdered />
            </div>
          </div>
          <div className="bg-primary rounded-xl w-40 h-15 flex items-center justify-center">
            <Plus />
            <span>Add Project</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
