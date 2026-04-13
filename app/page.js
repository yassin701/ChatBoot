"use client";
import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MessageBubble from '../components/MessageBubble';
import FloatingInput from '../components/FloatingInput';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    // Generate a unique session ID once per page load to persist memory in n8n
    sessionIdRef.current = Math.random().toString(36).substring(2, 15);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    // Optimistic user message append and UI loading indicator
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setMessages((prev) => [...prev, { role: 'ai', content: "Searching network...", isLoading: true }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: text, 
          sessionId: sessionIdRef.current 
        })
      });
      
      const data = await response.json();
      
      setMessages((prev) => {
        // Strip out the loading message and add the real backend response
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, { 
          role: 'ai', 
          content: response.ok ? data.output : (data.error || "The proxy returned an error.") 
        }];
      });
    } catch (error) {
      setMessages((prev) => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, { role: 'ai', content: "A critical network failure occurred." }];
      });
    }
  };

  return (
    <div className="flex h-screen w-full font-sans bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col relative h-full">
        {/* Top Header - Mobile Only or Minimal Desktop */}
        <header className="h-16 flex flex-shrink-0 items-center px-6 border-b border-gray-100 bg-white/70 backdrop-blur-md z-10 justify-between">
          <div className="font-semibold text-gray-800 text-lg tracking-tight">Advanced Chat</div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-500">Connected</span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-12 scroll-smooth">
          <div className="max-w-3xl mx-auto py-10 pb-44 flex flex-col min-h-full justify-end">
             {messages.length === 0 ? (
                 <div className="text-center text-gray-400 mb-20 animate-fade-in">
                   <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8 text-[#1D4ED8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                   </div>
                   <p className="text-xl font-semibold mb-2 text-gray-600">Start a Conversation</p>
                   <p className="text-sm">Type a message below to interact with the simulated AI.</p>
                 </div>
               ) : (
                 messages.map((msg, idx) => (
                   <MessageBubble 
                     key={idx}
                     isUser={msg.role === 'user'} 
                     message={msg.content} 
                   />
                 ))
             )}
             <div ref={messagesEndRef} />
          </div>
        </div>

        <FloatingInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
