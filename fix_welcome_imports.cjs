const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

code = code.replace(/import \{ Search/, "import { Syringe, ShieldCheck, Search");

fs.writeFileSync('src/components/WelcomeHub.tsx', code);
console.log('Imports fixed');
