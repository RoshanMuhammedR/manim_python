import React, { useEffect, useState } from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Chat from './Chat';
import CodeEditor from './CodeEditor';
import ReactPlayer from 'react-player';
import { useProjectStore } from '../store/useProjectStore';

const GeneratorSection = () => {
  
  const [input, setInput] = useState('')
  const [viewOpt, setViewOpt] = useState('chat');
  const { getScene, sendPrompt, chat, addChat, setChat, choosenScene,isFetchingCode } = useProjectStore();

  const handleSendLogic = () => {
    addChat(input);
    sendPrompt(input);
  }

  useEffect(() => {
    setChat(choosenScene.chatHistory || []);
  }, [choosenScene.chatHistory]);

  return (
    <div className='w-full h-full mt-4 md:mt-10 px-2 md:px-0'>
      <div className='w-full min-h-[600px] md:h-150 shadow-2xl rounded-2xl flex flex-col md:flex-row text-color overflow-hidden backdrop-blur-sm border border-white/10'>
        
        <div className="w-full md:min-w-[60%] h-full bg-bar md:rounded-l-2xl relative order-2 md:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none md:rounded-l-2xl"></div>
          
          <div className='h-32 md:h-40 border-b border-white/20 flex flex-col md:flex-row p-4 md:p-6 gap-3 md:gap-4 relative z-10'>
            <div className='flex-1 relative group'>
              <textarea 
                className='w-full h-20 md:h-full focus:outline-0 rounded-xl md:rounded-2xl bg-background shadow-lg p-3 md:p-6 text-base md:text-xl transition-all duration-300 focus:shadow-xl border border-white/10 focus:border-white/30'
                style={{ resize: 'none' }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your mathematical animation..."
              />
              <motion.div 
                className="absolute -top-2 md:-top-3 left-3 md:left-4 px-2 bg-primary text-xs md:text-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: input.length > 0 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles size={14} className="inline mr-1" />
                Prompt
              </motion.div>
            </div>
            
            <motion.button 
              disabled={!(input.length > 0) || isFetchingCode}  
              className={`mt-auto h-12 w-12 md:h-16 md:w-16 border-2 border-white/30 rounded-xl md:rounded-2xl flex-center transition-all duration-300 ${
                input.length > 0 
                  ? 'hover:bg-[rgb(var(--primary))] hover:border-[rgb(var(--primary))] cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleSendLogic}
              whileHover={input.length > 0 ? { scale: 1.05 } : {}}
              whileTap={input.length > 0 ? { scale: 0.95 } : {}}
            >
              <SendHorizontal size={20} className="md:hidden" />
              <SendHorizontal size={24} className="hidden md:block" />
            </motion.button>
          </div>
          
          <div className='w-full h-10 md:h-12 flex relative'>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"></div>
            <motion.div 
              className={`flex-center basis-1/2 border-r border-r-white/20 border-b-4 transition-all duration-300 cursor-pointer relative group ${
                viewOpt === 'chat' ? "border-b-[rgb(var(--primary))] bg-white/10" : "border-b-white/20 hover:bg-white/5"
              }`}
              onClick={() => setViewOpt('chat')}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold tracking-wide text-sm md:text-base">Chat History</span>
              
            </motion.div>
            <motion.div 
              className={`flex-center basis-1/2 border-b-4 transition-all duration-300 cursor-pointer relative group ${
                viewOpt === 'code' ? "border-b-[rgb(var(--primary))] bg-white/10" : "border-b-white/20 hover:bg-white/5"
              }`}
              onClick={() => setViewOpt('code')}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold tracking-wide text-sm md:text-base">Code Editor</span>
            </motion.div>
          </div>
          
          <div className="relative overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              {viewOpt === 'code' ? (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <CodeEditor />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Chat edit={() => setViewOpt('code')} chat={chat} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className='w-full md:w-full h-64 md:h-full bg-primary rounded-t-2xl md:rounded-t-none md:rounded-r-2xl order-1 md:order-2'>
          <div className='h-full p-4 md:p-6'>
            <span className='font-bold text-lg md:text-xl'>Animation preview</span>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorSection;