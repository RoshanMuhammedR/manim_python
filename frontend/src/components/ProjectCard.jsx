import React from 'react'

const ProjectCard = ({projName,projDesc,projStatus,projDate}) => {
  return (
   <div className="w-full h-48 bg-bar rounded-xl p-7 flex flex-col relative cursor-pointer">
        <span className='text-lg font-bold mb-3'>{projName}</span>
        <span className='font-light mb-3'>{projDesc}</span>
        <div className='w-22 h-7 rounded bg-primary flex-center '>
            {projStatus}
        </div>
        <div className='absolute bottom-3 right-5 font-light'>
            {projDate}
        </div>
   </div>
  )
}

export default ProjectCard
