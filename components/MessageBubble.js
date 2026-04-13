export default function MessageBubble({ isUser, message }) {
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 mr-4 mt-1 flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-6 py-4 shadow-sm leading-relaxed ${
          isUser
            ? 'bg-[#1D4ED8] text-white rounded-[24px] rounded-br-sm shadow-[0_4px_15px_rgba(29,78,216,0.15)]'
            : 'bg-white border border-gray-100 text-[#1F2937] rounded-[24px] rounded-bl-sm shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]'
        }`}
      >
        <p className="text-[15.5px] font-normal tracking-tight">{message}</p>
      </div>
    </div>
  );
}
