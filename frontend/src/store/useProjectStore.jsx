import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Message from "../components/Message";

export const useProjectStore = create((set,get)=>({
    isSubmiting: false,
    projects:null,
    choosenProj:null,
    choosenScene:null,
    chat:null,
    isFetchingCode:false,

    setChat:(chatHistory) => {
        set({chat:chatHistory});
    },
    addChat: (input) => {
        const newMsg = {
            role: 'user',
            content: input
        };
        set({chat:[...get().chat,newMsg]});
    },

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
    },

    getScene : async (projId) => {
        try {
            const res = await axiosInstance.get(`project/scene/${projId}`);
            set({choosenScene:res.data});
        }catch(error){
            console.log(error);
        }
    },

    sendPrompt : async (prompt) => {
        set({isFetchingCode:true});
        try {
            const res = await axiosInstance.post('project/getcode',{prompt,id:get().choosenScene._id});
            console.log(res.data);
            get().getScene(get().choosenScene._id);
        } catch (error) {
            console.log(error);
        }finally{
            set({isFetchingCode:false});
        }
    }
}))