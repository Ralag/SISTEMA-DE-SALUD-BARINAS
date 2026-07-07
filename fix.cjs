const fs = require('fs');

let welcome = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');
welcome = welcome.replace(/bg-\[slate-900\]/g, 'bg-white dark:bg-slate-900');
welcome = welcome.replace(/border-\[slate-800\]/g, 'border-slate-200 dark:border-slate-800');

welcome = welcome.replace(/text-white font-display/g, 'text-slate-800 dark:text-slate-100');
welcome = welcome.replace(/text-blue-200\/80/g, 'text-slate-500 dark:text-slate-400');

welcome = welcome.replace(/bg-emerald-500\/10 text-emerald-400 text-\[10px\] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-500\/20 backdrop-blur-sm/g, 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-200 dark:border-emerald-800');

welcome = welcome.replace(/bg-blue-500\/10 text-blue-300 text-\[10px\] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-500\/20 backdrop-blur-sm/g, 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700');

fs.writeFileSync('src/components/WelcomeHub.tsx', welcome);

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/bg-\[slate-900\]/g, 'bg-white dark:bg-slate-900');
app = app.replace(/border-\[slate-800\]/g, 'border-slate-200 dark:border-slate-800');
fs.writeFileSync('src/App.tsx', app);
