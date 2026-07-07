const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{tsx,ts,css}');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/#0A1A2F/g, 'slate-900');
  code = code.replace(/#162D4C/g, 'slate-800');
  code = code.replace(/#1E3A5F/g, 'slate-700');
  code = code.replace(/#060D18/g, 'slate-950');
  code = code.replace(/bg-transparent/g, 'bg-slate-950');
  fs.writeFileSync(file, code);
});
