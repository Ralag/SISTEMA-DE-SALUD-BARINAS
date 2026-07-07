const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

const importStats = "import StatisticsHome from './dashboards/StatisticsHome';\n";
// add it after react-router-dom import
code = code.replace(/import \{ Link \} from 'react-router-dom';/, "import { Link } from 'react-router-dom';\n" + importStats);

const replacement = `  // Routing para Dashboards de Inicio Personalizados
  if (['ESTADISTICA', 'DIRECTOR_ASIC', 'ESTADISTICA_ASIC'].includes(user.department)) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <HeaderCorporativo user={user} isOperational={isOperational} />
        <StatisticsHome />
      </div>
    );
  }

  // Fallback (Generic Home)
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <HeaderCorporativo user={user} isOperational={isOperational} />
`;

const headerComponent = `function HeaderCorporativo({ user, isOperational }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-200 dark:border-blue-800">
              {user.title}
            </span>
            {user.department && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                {user.department}
              </span>
            )}
            {user.asicAccess && (
              <span className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                <MapPin size={10} /> ASIC {user.asicAccess}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-slate-800 dark:text-slate-100">
            Sistema Salas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Espacio de trabajo unificado. Bienvenido, <span className="font-bold text-slate-700 dark:text-slate-300">{user.name}</span>. 
            {isOperational && user.cptAccess ? \` Has ingresado al terminal del \${user.cptAccess}.\` : ''}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock size={16} className="text-slate-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">
              09:41 AM <span className="text-slate-400 font-normal">|</span> Jue, 24 Jul
            </span>
          </div>
        </div>
      </div>
  );
}

`;

code = code.replace(/return \(\s*<div className="p-4 md:p-6 max-w-7xl mx-auto w-full">\s*\{\/\* Header Corporativo \(Workspace\) \*\/\}\s*<div className="bg-white dark:bg-slate-900 rounded-2xl[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, replacement);
code = code + '\n' + headerComponent;

fs.writeFileSync('src/components/WelcomeHub.tsx', code);
console.log('WelcomeHub router added');
