const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  'className="flex items-center gap-2 hover:bg-blue-800 px-2 py-1 rounded cursor-pointer transition-colors"',
  'className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1 rounded cursor-pointer transition-colors"'
);

app = app.replace(
  'className="text-xs font-bold uppercase leading-tight text-white"',
  'className="text-xs font-bold uppercase leading-tight text-slate-800 dark:text-slate-100"'
);

app = app.replace(
  'className="text-[9px] text-blue-300 uppercase leading-tight"',
  'className="text-[9px] text-slate-500 uppercase leading-tight"'
);

app = app.replace(/dark:bg-white dark:bg-slate-900/g, 'dark:bg-slate-900');
app = app.replace(/dark:border-slate-200 dark:border-slate-800/g, 'dark:border-slate-800');
app = app.replace(/bg-\[slate-800\]\/50/g, 'bg-slate-800/50');
app = app.replace(/bg-\[slate-800\]/g, 'bg-slate-800');

fs.writeFileSync('src/App.tsx', app);
