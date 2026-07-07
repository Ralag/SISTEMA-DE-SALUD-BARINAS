const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/dark:bg-white dark:bg-slate-900/g, 'dark:bg-slate-900');
  code = code.replace(/dark:border-slate-200 dark:border-slate-800/g, 'dark:border-slate-800');
  
  // Also any other weird duplicates
  code = code.replace(/dark:text-slate-800 dark:text-slate-100/g, 'dark:text-slate-100');
  code = code.replace(/dark:text-slate-400 dark:text-slate-300/g, 'dark:text-slate-300');
  code = code.replace(/dark:bg-slate-800 dark:bg-slate-900/g, 'dark:bg-slate-900');
  code = code.replace(/dark:hover:bg-slate-800 dark:hover:bg-slate-700/g, 'dark:hover:bg-slate-700');
  code = code.replace(/dark:border-slate-100 dark:border-slate-200 dark:border-slate-800/g, 'dark:border-slate-800');
  code = code.replace(/dark:bg-\[slate-800\]\/50/g, 'dark:bg-slate-800/50');
  
  fs.writeFileSync(file, code);
});
