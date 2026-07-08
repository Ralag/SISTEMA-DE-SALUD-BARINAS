const fs = require('fs');
let content = fs.readFileSync('src/components/dashboards/AdminConfigDashboard.tsx', 'utf8');
content = content.replace("          )}\n          )}", "          )}");
fs.writeFileSync('src/components/dashboards/AdminConfigDashboard.tsx', content);

let prog = fs.readFileSync('src/components/ProgramsHub.tsx', 'utf8');
prog = prog.replace("{config.modules.programs?.name || '{config?.modules?.programs?.appTitle || config?.modules?.programs?.name || \\'Programas de Salud\\'}'}", "{config?.modules?.programs?.appTitle || config?.modules?.programs?.name || 'Programas de Salud'}");
fs.writeFileSync('src/components/ProgramsHub.tsx', prog);

let sacs = fs.readFileSync('src/components/SACSHub.tsx', 'utf8');
sacs = sacs.replace("{config.modules.sacs?.name || '{config?.modules?.sacs?.appTitle || config?.modules?.sacs?.name || \\'Contraloría Sanitaria (SACS)\\'}'}", "{config?.modules?.sacs?.appTitle || config?.modules?.sacs?.name || 'Contraloría Sanitaria (SACS)'}");
fs.writeFileSync('src/components/SACSHub.tsx', sacs);
