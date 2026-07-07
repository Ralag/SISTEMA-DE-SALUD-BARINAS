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
  code = code.replace(/#0A1A2F/g, 'slate-900');
  code = code.replace(/#162D4C/g, 'slate-800');
  code = code.replace(/#1E3A5F/g, 'slate-700');
  code = code.replace(/#060D18/g, 'slate-950');
  code = code.replace(/bg-\[#0D2440\]/g, 'bg-slate-50 dark:bg-slate-800/50');
  code = code.replace(/text-white placeholder-blue-200\/40 focus:ring-emerald-500\/50 focus:border-emerald-500/g, 'text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-blue-500/20 focus:border-blue-500');
  code = code.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\]/g, 'shadow-sm');
  fs.writeFileSync(file, code);
});
