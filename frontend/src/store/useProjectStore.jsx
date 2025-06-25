import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Message from "../components/Message";

export const useProjectStore = create((set,get)=>({
    isSubmiting: false,
    projects:null,
    choosenProj:null,

    setChoosenProj: (project) => set({choosenProj:project}),

    addProj: async (data)=> {
        set({isSubmiting:true})
        try {
            const res = await axiosInstance.post('project/newproj',{...data});
            toast.custom((t) => (
                <Message title={`successfully Added project "${data.projName}"`} type="success" />
            ));
        } catch (error) {
            console.log(error);
        }finally{
            set({isSubmiting:false});
        }
    },

    getProjects: async () => {
        try {
            const res = await axiosInstance.get('project/all');
            set({projects:res.data?.data});
        } catch (error) {
            console.log(error);
        }
    }
}))