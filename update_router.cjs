const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I need to find the HomeRouter component and modify it.
const routerRegex = /function HomeRouter\(\) \{[\s\S]*?return <WelcomeHub \/>;\n\}/;

const newRouter = `function HomeRouter() {
  const { user } = useAppContext();
  
  if (!user) return <WelcomeHub />;

  // Autoridad Unica
  if (user.department === 'DES') return <AuthorityHub />;
  
  // Custom Hubs
  if (user.department === 'EPIDEMIOLOGIA') return <EpidemiologyHub />;
  if (user.department === 'SEFAR') return <LogisticsHub />;
  if (user.department === 'RRHH') return <HRHub />;
  if (user.department === 'SACS') return <SACSHub />;
  if (user.department === 'RED_ATENCION') return <NetworksHub />;
  if (user.department === 'ESTADISTICA') return <StatisticsHub />;
  if (user.department === 'INMUNIZACION') return <ImmunizationHub />;

  // Fallback for other programs to ProgramsHub
  const programs = ['TUBERCULOSIS', 'ITS_VIH', 'CAREMT', 'SALUD_FAMILIAR', 'SALUD_COMUNITARIA', 'MALARIOLOGIA', 'PROGRAMAS_SALUD'];
  if (programs.includes(user.department)) return <ProgramsHub />;

  return <WelcomeHub />;
}`;

if (code.match(routerRegex)) {
  code = code.replace(routerRegex, newRouter);
  
  // Also need to add imports
  const importsToAdd = `import AuthorityHub from './components/AuthorityHub';\nimport ImmunizationHub from './components/ImmunizationHub';\n`;
  if (!code.includes('AuthorityHub')) {
    code = code.replace(/import WelcomeHub from '\.\/components\/WelcomeHub';/, "import WelcomeHub from './components/WelcomeHub';\n" + importsToAdd);
  }
  
  fs.writeFileSync('src/App.tsx', code);
  console.log('Router updated');
} else {
  console.log('HomeRouter not found');
}
