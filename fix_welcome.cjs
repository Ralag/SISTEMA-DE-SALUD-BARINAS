const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

const replacement = `  const allQuickAccess = [
    { title: 'Epidemiología', subtitle: 'Análisis y Alertas', value: '3 Activas', icon: <Activity size={20} className="text-emerald-600" />, colorClass: 'emerald', to: '/epidemiology', linkText: 'Ver Sala de Guerra', dept: 'EPIDEMIOLOGIA' },
    { title: 'Estadística (CEIS)', subtitle: 'Indicadores', value: '98%', icon: <BarChart3 size={20} className="text-cyan-600" />, colorClass: 'blue', to: '/stats', linkText: 'Ver CEIS', dept: 'ESTADISTICA' },
    { title: 'Red de Atención', subtitle: 'Operatividad', value: '94%', icon: <Layers size={20} className="text-blue-600" />, colorClass: 'blue', to: '/networks', linkText: 'Monitorear Red', dept: 'RED_ATENCION' },
    { title: 'Inmunización (PAI)', subtitle: 'Cobertura Mensual', value: '88.4%', icon: <Syringe size={20} className="text-indigo-600" />, colorClass: 'indigo', to: '/immunization', linkText: 'Ver Programa', dept: 'INMUNIZACION' },
    { title: 'Contraloría', subtitle: 'Inspecciones SACS', value: '45', icon: <ShieldCheck size={20} className="text-rose-600" />, colorClass: 'rose', to: '/sacs', linkText: 'Ver Operativos', dept: 'SACS' },
    { title: 'SEFAR', subtitle: 'Disponibilidad Almacén', value: '78%', icon: <Package size={20} className="text-amber-600" />, colorClass: 'amber', to: '/logistics', linkText: 'Ver Inventario', dept: 'SEFAR' },
  ];

  const quickAccess = allQuickAccess.filter(app => {
    if (user?.level === 'ADMIN' || user?.level === 'L0_STRATEGIC' || user?.department === 'DES') return true;
    return app.dept === user?.department || (app.dept === 'ESTADISTICA' && ['DIRECTOR_ASIC', 'ESTADISTICA_ASIC'].includes(user?.department));
  });`;

code = code.replace(/const quickAccess = \[([\s\S]*?)\];/, replacement);
fs.writeFileSync('src/components/WelcomeHub.tsx', code);
console.log('WelcomeHub updated');
