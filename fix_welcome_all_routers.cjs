const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeHub.tsx', 'utf8');

const imports = `import StatisticsHome from './dashboards/StatisticsHome';
import AuthorityHome from './dashboards/AuthorityHome';
import EpidemiologyHome from './dashboards/EpidemiologyHome';
import ImmunizationHome from './dashboards/ImmunizationHome';\n`;

code = code.replace(/import StatisticsHome from '\.\/dashboards\/StatisticsHome';/, imports);

const routers = `  // Routing para Dashboards de Inicio Personalizados
  if (user.department === 'DES') {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <HeaderCorporativo user={user} isOperational={isOperational} />
        <AuthorityHome />
      </div>
    );
  }

  if (user.department === 'EPIDEMIOLOGIA') {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <HeaderCorporativo user={user} isOperational={isOperational} />
        <EpidemiologyHome />
      </div>
    );
  }

  if (user.department === 'INMUNIZACION') {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <HeaderCorporativo user={user} isOperational={isOperational} />
        <ImmunizationHome />
      </div>
    );
  }

  if (['ESTADISTICA', 'DIRECTOR_ASIC', 'ESTADISTICA_ASIC'].includes(user.department)) {`;

code = code.replace(/  \/\/ Routing para Dashboards de Inicio Personalizados\n  if \(\['ESTADISTICA', 'DIRECTOR_ASIC', 'ESTADISTICA_ASIC'\]\.includes\(user\.department\)\) \{/, routers);

fs.writeFileSync('src/components/WelcomeHub.tsx', code);
console.log('WelcomeHub routers fully updated');
