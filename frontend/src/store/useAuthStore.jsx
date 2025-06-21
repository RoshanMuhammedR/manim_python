import toast from 'react-hot-toast';
import { create } from 'zustand'
import Message from '../components/Message';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
    authUser: null,
    isAuthning:false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data});
        } catch (error) {
            set({authUser:null})
        }
    },

    signup: async (data) => {
        set({isAuthning:true});
        try {
            const res = await axiosInstance.post('auth/signup', { ...data });
            if (res && res.data) {
                set({authUser:res.data})
                toast.custom((t) => (
                    <Message title="Account creation is successful" type="success" />
                ));
            } else {
                toast.custom((t) => (
                    <Message title="Account creation failed" desc="Server not responding" type="error" />
                ));
            }
        } catch (error) {
            console.log(error);
            toast.custom((t) => (
                <Message
                    title="Account creation failed"
                    desc={error.response?.data.message}
                    type="error"
                />
            ));
        } finally {
            set({isAuthning:false});
        }
    },

    signin: async (data) => {
        set({isAuthning:true});
        try {
            const res = await axiosInstance.post('/auth/signin',{...data});
            set({authUser:res.data})
            toast.custom((t) => (
                <Message
                    title="sigin successful"
                    type="success"
                />
            ));
        } catch (error) {
            toast.custom((t) => (
            <Message
                title="signin failed"
                desc={error.response?.data.message}
                type="error"
            />));
        } finally {
            set({isAuthning:false});
        }
    }

    
}))