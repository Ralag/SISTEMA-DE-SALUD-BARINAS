const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `        {/* Integrated User & Apps Menu */}
        <div className="relative" ref={userMenuRef}>
          <div 
            className={\`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-colors border \${isUserMenuOpen ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}\`}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold uppercase leading-tight text-slate-800 dark:text-slate-100">{user.name}</p>
              <p className="text-[9px] text-slate-500 uppercase leading-tight">{user.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-700 border border-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                <Users size={14} />
              </div>
              <LayoutGrid size={16} className="text-slate-400" />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-[340px] bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 border border-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase text-slate-800 dark:text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-500 uppercase">{user.department}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">Módulos Disponibles</p>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {allowedApps.map((app, idx) => (
                    <Link 
                      key={idx} 
                      to={app.path}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center cursor-pointer group"
                    >
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        {app.icon}
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800/50">
                <button
                  onClick={() => {
                    setUser(null);
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors flex items-center gap-2"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}`;

code = code.replace(/\{\/\* User Profile & Role Switcher \*\/\}[\s\S]*?<\/header>\n  \);/, replacement);
fs.writeFileSync('src/App.tsx', code);
console.log('Replaced');
