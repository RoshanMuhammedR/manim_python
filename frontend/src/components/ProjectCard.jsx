import React from 'react'
import { useProjectStore } from '../store/useProjectStore'
import {motion, spring} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({project}) => {
  const navigate = useNavigate();
  const {setChoosenProj} = useProjectStore();
  const handleProjectSelection = () => {
    setChoosenProj(project);
    navigate(`/dashboard/${encodeURIComponent(project.projName)}`);
  }
  return (
   <motion.div 
    className="w-full h-48 bg-bar rounded-xl p-7 flex flex-col relative cursor-pointer"
    onClick={handleProjectSelection}
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 0.6, type: 'spring' }}
  >
        <span className='text-lg font-bold mb-3'>{project.projName}</span>
        <span className='font-light mb-3'>{project.projDesc}</span>
        <div className='w-22 h-7 rounded bg-primary flex-center '>
            {project.projStatus}
        </div>
        <div className='absolute bottom-3 right-5 font-light'>
          {project.createdAt ? new Date(project.createdAt).toISOString().split('T')[0] : 'No Date'}
        </div>

   </motion.div>
  )
}

export default ProjectCard
