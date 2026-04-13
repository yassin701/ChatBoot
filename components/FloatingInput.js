"use client";
import { useState } from 'react';

export default function FloatingInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute flex justify-center bottom-0 left-0 w-full p-4 pb-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent pointer-events-none z-10">
      <div className="w-full max-w-3xl pointer-events-auto">
        <div className="relative flex items-end bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:shadow-[0_8px_30px_rgba(37,99,235,0.12)] focus-within:border-blue-300 transition-all duration-300">
          <button className="absolute left-4 bottom-3.5 w-8 h-8 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-[#1F2937] placeholder-gray-400 text-[15.5px] max-h-32 min-h-[56px] resize-none outline-none py-[18px] px-14 overflow-hidden"
            placeholder="Message the assistant..."
            rows={1}
          />
          
          <button 
            onClick={handleSend}
            className="absolute right-3 bottom-2.5 w-[36px] h-[36px] bg-[#1D4ED8] text-white rounded-2xl shadow-md flex items-center justify-center hover:bg-[#2563EB] hover:scale-105 transition-all duration-200 group">
            <svg className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-3 font-medium tracking-wide">
          AI generated content may be inaccurate.
        </p>
      </div>
    </div>
  );
}
