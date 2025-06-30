import React, { useRef, useEffect, memo } from 'react';
import SystemMessage from './SystemMessage';
import { useCodeStore } from '../store/useCodeStore';

const Chat = ({ edit, chat }) => {
  const { setCode } = useCodeStore();
  const chatRef = useRef();

  useEffect(() => {
    const chatBox = chatRef.current;
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, []);

  return (
    <div ref={chatRef} className="w-full h-full max-h-[400px] overflow-y-auto p-4 space-y-6">
      {chat && chat.map((msg, idx) =>
        msg.role === 'user' ? (
          <div key={idx} className="flex justify-end w-full">
            <div className="bg-primary text-color max-w-[75%] p-3 rounded-2xl rounded-tr-none shadow">
              {msg.content}
            </div>
          </div>
        ) : (
          <SystemMessage key={idx} content={msg.content} edit={edit} />
        )
      )}
    </div>
  );
};

export default memo(Chat);
