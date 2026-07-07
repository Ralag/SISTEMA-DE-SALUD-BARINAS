const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexApps = /const allApps: \{ name: string, path: string, icon: React\.ReactNode, roles: AccessLevel\[\] \}\[\] = \[([\s\S]*?)\];/;

const newApps = `const allApps: { name: string, path: string, icon: React.ReactNode, roles: AccessLevel[], departments?: string[] }[] = [
    { name: 'Workspace (Inicio)', path: '/', icon: <LayoutDashboard size={22} className="text-slate-600" />, roles: ['L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] },
    { name: 'Epidemiología', path: '/epidemiology', icon: <Activity size={22} className="text-emerald-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['EPIDEMIOLOGIA'] },
    { name: 'Estadística (CEIS)', path: '/stats', icon: <BarChart3 size={22} className="text-cyan-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['ESTADISTICA', 'DIRECCION_ASIC', 'ESTADISTICA_ASIC'] },
    { name: 'Inmunización (PAI)', path: '/immunization', icon: <HeartPulse size={22} className="text-indigo-600" />, roles: ['L1_TACTICAL', 'L2_LOCAL'], departments: ['INMUNIZACION'] },
    { name: 'Programas de Salud', path: '/programs', icon: <HeartPulse size={22} className="text-purple-600" />, roles: ['L1_TACTICAL', 'L2_LOCAL'], departments: ['TUBERCULOSIS', 'ITS_VIH', 'CAREMT', 'SALUD_FAMILIAR', 'SALUD_COMUNITARIA', 'MALARIOLOGIA', 'PROGRAMAS_SALUD'] },
    { name: 'SEFAR (Logística)', path: '/logistics', icon: <Package size={22} className="text-blue-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['SEFAR'] },
    { name: 'Recursos Humanos', path: '/hr', icon: <Users size={22} className="text-amber-600" />, roles: ['L1_CENTRAL'], departments: ['RRHH'] },
    { name: 'Contraloría (SACS)', path: '/sacs', icon: <ShieldCheck size={22} className="text-rose-600" />, roles: ['L1_CENTRAL'], departments: ['SACS'] },
    { name: 'Redes de Atención', path: '/networks', icon: <Layers size={22} className="text-blue-600" />, roles: ['L1_CENTRAL'], departments: ['RED_ATENCION'] },
    { name: 'Configuración', path: '/settings', icon: <Settings size={22} className="text-slate-600 dark:text-slate-300" />, roles: ['L1_CENTRAL', 'L0_STRATEGIC', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] }
  ];

  const allowedApps = allApps.filter(app => {
    if (user.level === 'ADMIN' || user.level === 'L0_STRATEGIC' || user.department === 'DES') return true;
    if (!app.roles.includes(user.level)) return false;
    if (app.departments && !app.departments.includes(user.department)) return false;
    return true;
  });`;

if(code.match(regexApps)) {
  code = code.replace(regexApps, ''); // remove the original allApps
  code = code.replace(/const allowedApps = allApps\.filter\([\s\S]*?\);/, newApps); // replace allowedApps with the new block
  fs.writeFileSync('src/App.tsx', code);
  console.log('App menus filtered successfully');
} else {
  console.log('regex did not match');
}
