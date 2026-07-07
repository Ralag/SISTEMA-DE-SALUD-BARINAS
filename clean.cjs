const fs = require('fs');

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
  code = code.replace(/dark:hover:bg-\[slate-800\]\/50/g, 'dark:hover:bg-slate-800/50');
  code = code.replace(/dark:border-\[slate-700\]/g, 'dark:border-slate-700');
  code = code.replace(/dark:border-slate-200 dark:border-slate-700/g, 'dark:border-slate-700');
  code = code.replace(/dark:bg-\[slate-800\]\/20/g, 'dark:bg-slate-800/20');
  code = code.replace(/bg-\[slate-950\]/g, 'bg-slate-950');
  code = code.replace(/dark:bg-\[slate-950\]/g, 'dark:bg-slate-950');
  fs.writeFileSync(file, code);
});
