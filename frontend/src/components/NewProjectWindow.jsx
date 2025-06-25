import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../lib/axios';
import { useProjectStore } from '../store/useProjectStore';
import {Loader} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion';

const NewProjectWindow = ({onClose}) => {
    const {addProj,isSubmiting,getProjects} = useProjectStore()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitProj = (data) => {
        addProj(data);
        getProjects();
        onClose();
    }

    return (
        <motion.div 
            className="text-[rgb(var(--text))] z-10 fixed inset-0 flex items-center justify-center backdrop-blur-lg px-4 select-none"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{
                duration: 0.4,
                type:'spring'
            }}
        >    
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-background rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(submitProj)}>
                    <p className="text-lg mb-1">Project Name</p>
                    <input 
                        {...register('projName',{
                            required: "Project name is required",
                            minLength: { value: 3, message: "Must be at least 3 characters long" }
                        })}
                        type="text"
                        className="bg-bar rounded-xl h-12 w-full p-4 text-base md:text-xl outline-none mb-1"
                    />
                    {errors.projName && (
                        <p className="text-sm text-red-600 mb-3">{errors.projName.message}</p>
                    )}

                    <p className="text-lg mb-1">Description</p>
                    <textarea
                        {...register('projDesc',{
                            maxLength: { value: 250, message: "Must be at most 250 characters long" }
                        })} 
                        maxLength={250}
                        rows={5}
                        placeholder="Enter up to 250 characters..."
                        className="bg-bar rounded-xl w-full p-4 text-base md:text-xl outline-none mb-1 resize-none"
                    />
                    {errors.projDesc && (
                        <p className="text-sm text-red-600 mb-3">{errors.projDesc.message}</p>
                    )}

                    <button
                        className="mt-3 bg-primary rounded-xl w-full h-13 flex items-center justify-center cursor-pointer hover:opacity-90 transition"
                        type="submit"
                    >
                        {isSubmiting && (
                            <div className='animate-spin mr-2'>
                                <Loader />
                            </div>
                        )}
                        Submit
                    </button>

                    <div 
                        className="mt-3 bg-bar hover:bg-gray-300 transition rounded-xl w-full h-13 flex items-center justify-center cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default NewProjectWindow
