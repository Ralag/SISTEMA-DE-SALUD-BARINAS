const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  'className="bg-white dark:bg-slate-900 text-white h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-40 relative"',
  'className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 h-14 flex items-center justify-between px-4 shadow-sm border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-40 relative"'
);

app = app.replace(
  'className="p-1.5 hover:bg-blue-800 rounded transition-colors text-blue-100"',
  'className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-500"'
);

app = app.replace(
  '<div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center justify-center font-bold shadow-sm backdrop-blur-sm">',
  '<div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-center font-bold shadow-sm">'
);

app = app.replace(
  'className="hidden sm:flex items-center gap-1.5 bg-blue-950/40 px-2 py-1 rounded border border-blue-800/50 mr-2"',
  'className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 mr-2"'
);

app = app.replace(
  'className="text-[10px] font-bold uppercase tracking-wider text-blue-200"',
  'className="text-[10px] font-bold uppercase tracking-wider text-slate-500"'
);

app = app.replace(
  'className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${isAppsOpen ? \'bg-[slate-800] text-white\' : \'text-blue-100 hover:bg-blue-800\'}`}',
  'className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${isAppsOpen ? \'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white\' : \'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800\'}`}'
);

app = app.replace(/bg-\[slate-950\]/g, 'bg-slate-950');

fs.writeFileSync('src/App.tsx', app);
