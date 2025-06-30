import { create } from 'zustand'

export const useCodeStore = create((set,get)=>({
    code:null,

    setCode: (Code)=>set({code:Code})
}))

