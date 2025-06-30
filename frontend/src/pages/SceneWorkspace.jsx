import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {WandSparkles,Clapperboard,FileInput} from 'lucide-react';
import GeneratorSection from '../components/GeneratorSection';
import EditorSection from '../components/EditorSection';
import ExporterSection from '../components/ExporterSection';
import { useProjectStore } from '../store/useProjectStore';

const SceneWorkspace = () => {
    const [curWindow,setCurWindow] = useState('generator');
    const {authUser} = useAuthStore();
    const {getScene,choosenScene} = useProjectStore()
    
    const getIntials = (username)=> {
      return username.split(' ').map(word => word[0]?.toUpperCase() || '' ).join('');
    }
    const {projectId}=useParams();

    useEffect(() => {
      if (projectId) {
        getScene(projectId);
      }
    }, [projectId]);   
  return (
    <div className='w-full min-h-screen text-color bg-background'>

      <div className='w-full h-17 bg-bar flex justify-between items-center xl:px-70 lg:px-30  px-10 '>
        <span className='font-bold text-2xl'>Sequential Workflow</span>
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

      <div className='w-full  xl:px-70 lg:px-30  px-10 mt-8'>
        <div className="flex justify-between h-30">
          <div className="size-30 flex flex-col items-center mr-4">
            <div 
              className={`size-20 ${curWindow==='generator'?'bg-primary':'bg-bar'} rounded-full flex-center cursor-pointer`}
              onClick={()=>setCurWindow('generator')}
            >
            <WandSparkles className='size-9'/>
            </div>
            <span className='mt-3'>Generator</span>
          </div>
          <div className='w-full h-full relative'>
            <div
              className='border-t-4 w-full h-[50%] top-[30%] absolute'
              style={{
                borderColor: "rgb(var(--primary), 0.3)",
              }}
            ></div>
          </div>
          <div className="size-30 flex flex-col items-center mx-4">
            <div 
              className={`size-20 ${curWindow==='editor'?'bg-primary':'bg-bar'} rounded-full flex-center cursor-pointer`}
              onClick={()=>setCurWindow('editor')}
            >
              <Clapperboard className='size-9'/>
            </div>
            <span className="mt-3">Editor</span>
          </div>
          <div className='w-full h-full relative'>
            <div
              className='border-t-4 w-full h-[50%] top-[30%] absolute'
              style={{
                borderColor: "rgb(var(--primary), 0.3)",
              }}
            ></div>
          </div>
          <div className="size-30 flex flex-col items-center ml-4">
            <div 
              className={`size-20 ${curWindow==='exporter'?'bg-primary':'bg-bar'} rounded-full flex-center cursor-pointer`}
              onClick={()=>setCurWindow('exporter')}
            >
              <FileInput className='size-9'/>
            </div>
            <span className="mt-3">Exporter</span>
          </div>
        </div>
        <div>
            {/* Immediately Invoked Function Expression (IIFE) */}
            {choosenScene && (()=>{
              switch (curWindow) {
                case 'generator':
                  return <GeneratorSection 
                        />
                case 'editor':
                  return <EditorSection />
                case 'exporter':
                  return <ExporterSection />
                default:
                  return null;
              }
            })()}
        </div>
        
      </div>


    </div>
  )
}

export default SceneWorkspace
