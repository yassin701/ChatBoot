export default function Sidebar() {
  const recentChats = [];

  return (
    <aside className="w-64 bg-[#0A1128] text-white flex flex-col flex-shrink-0 h-full border-r border-[#1a2542] shadow-2xl z-20">
      <div className="p-5">
        <button className="w-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-medium py-3 px-4 rounded-xl shadow-[0_4px_12px_rgba(29,78,216,0.3)] transition-all duration-200 flex items-center justify-center gap-2 group">
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span className="tracking-wide text-[15px]">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 mt-2 space-y-[2px]">

        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Recent</h3>
        {recentChats.map((chat, i) => (
          <button key={i} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-[#1E293B] transition-colors truncate">
            {chat}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#1a2542]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1E293B] cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex-shrink-0"></div>
          <div className="text-sm font-medium">Guest User</div>
        </div>
      </div>
    </aside>
  );
}
