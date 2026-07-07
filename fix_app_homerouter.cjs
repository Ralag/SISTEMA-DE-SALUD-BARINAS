const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `function HomeRouter() {
  return <WelcomeHub />;
}`;

code = code.replace(/function HomeRouter\(\) \{[\s\S]*?return <WelcomeHub \/>;\n\}/, replacement);

fs.writeFileSync('src/App.tsx', code);
console.log('HomeRouter simplified');
