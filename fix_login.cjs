const fs = require('fs');
let login = fs.readFileSync('src/components/LoginScreen.tsx', 'utf8');

login = login.replace(/dark:bg-\[slate-950\]/g, 'dark:bg-slate-950');
login = login.replace(/dark:bg-\[slate-900\]/g, 'dark:bg-slate-900');
login = login.replace(/className="bg-\[slate-900\] md:w-1\/3 p-8 flex flex-col items-center justify-center text-center text-white flex-shrink-0"/g, 'className="bg-slate-900 md:w-1/3 p-8 flex flex-col items-center justify-center text-center text-white flex-shrink-0"');

fs.writeFileSync('src/components/LoginScreen.tsx', login);

