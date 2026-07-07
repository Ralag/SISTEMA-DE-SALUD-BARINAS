const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

code = code.replace(
  'className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"',
  'className="bg-[#0A1A2F] rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#162D4C] mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"'
);

// We need to change the text colors inside this header from dark to light since background is now dark
code = code.replace(
  '<h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">',
  '<h1 className="text-2xl md:text-3xl font-black tracking-tight text-white font-display">'
);
code = code.replace(
  '<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">',
  '<p className="text-blue-200/80 text-sm mt-1">'
);

// Replace the badges inside the header to fit the dark theme
code = code.replace(
  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-200 dark:border-emerald-800',
  'bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-500/20 backdrop-blur-sm'
);

code = code.replace(
  'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700',
  'bg-blue-500/10 text-blue-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-500/20 backdrop-blur-sm'
);

// Replace the search bar styling inside the header
code = code.replace(
  'className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"',
  'className="block w-full pl-10 pr-3 py-3 border border-[#1E3A5F] rounded-xl leading-5 bg-[#0D2440] text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:text-sm"'
);

// Add decorative background elements to the header
code = code.replace(
  '<div>\n          <div className="flex items-center gap-2 mb-2">',
  '{/* Decoration */}\n        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>\n        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>\n        <div className="relative z-10">\n          <div className="flex items-center gap-2 mb-2">'
);

// close the div added above
code = code.replace(
  '</p>\n        </div>',
  '</p>\n        </div>\n        </div>'
);

fs.writeFileSync('src/components/WelcomeHub.tsx', code);
