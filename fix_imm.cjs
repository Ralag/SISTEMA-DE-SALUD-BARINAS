const fs = require('fs');
let code = fs.readFileSync('src/components/ImmunizationHub.tsx', 'utf8');

code = code.replace(/"&gt;88/g, '">88');
code = code.replace(/ALERTA &gt;8°C/g, 'ALERTA {">8°C"}');

fs.writeFileSync('src/components/ImmunizationHub.tsx', code);
