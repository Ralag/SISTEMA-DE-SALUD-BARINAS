const fs = require('fs');
let welcome = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

welcome = welcome.replace(/border-\[slate-700\]/g, 'border-slate-200 dark:border-slate-700');
welcome = welcome.replace(/text-white placeholder-blue-200\/40 focus:outline-none focus:ring-2 focus:ring-emerald-500\/50 focus:border-emerald-500/g, 'text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500');

fs.writeFileSync('src/components/WelcomeHub.tsx', welcome);
